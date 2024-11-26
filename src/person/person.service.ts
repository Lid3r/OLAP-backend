import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './model/person.model';
import { CreatePersonDTO } from './model/person.dto';
import { FirstName } from './model/dim_firstname/first-name.model';
import { LastName } from './model/dim_lastname/last-name.model';
import { Health } from './model/dim_health/health.model';
import { Job } from './model/dim_job/job.model';
import { Year } from './model/dim_years/year.model';
import { FindOptions, Includeable, WhereOptions } from 'sequelize';
import { Aggregator, Operation, TableBody, TableField } from './table.dto';

export interface ReturnModel {
  x: { key: string; model: string; value: string };
  y: { key: string; model: string; value: string };
  z: { key: string; model: string; value: string };
  field: { key: string; model: string; value: string };
}

@Injectable()
export class PersonService {
  private includeables: Includeable[] = [];
  private model: any;
  private returnModel: ReturnModel;

  constructor(
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(FirstName) private nameModel: typeof FirstName,
    @InjectModel(LastName) private lastNameModel: typeof LastName,
    @InjectModel(Year) private yearModel: typeof Year,
    @InjectModel(Job) private jobModel: typeof Job,
    @InjectModel(Health) private healthModel: typeof Health,
  ) {
    this.init();
  }

  private init() {
    this.personModel.sync();
    this.nameModel.sync();
    this.lastNameModel.sync();
    this.yearModel.sync();
    this.jobModel.sync();
    this.healthModel.sync();
  }

  async findWithOptions(options?: FindOptions<any>) {
    const returnedRows = await this.model.findAll({
      ...options,
      attributes: ['id'],
      include: this.includeables,
    });

    return returnedRows.map((row: any) => {
      return {
        id: row.id,
        [this.returnModel.x.key]:
          row[this.returnModel.x.model][this.returnModel.x.value],
        [this.returnModel.y.key]:
          row[this.returnModel.y.model][this.returnModel.y.value],
        [this.returnModel.z.key]:
          row[this.returnModel.z.model][this.returnModel.z.value],
        [this.returnModel.field.key]:
          row[this.returnModel.field.model][this.returnModel.field.value],
      };
    });
  }

  async getNames() {
    return await this.lastNameModel.findAll();
  }

  async obliterate() {
    this.personModel.destroy({ where: {} });
    this.nameModel.destroy({ where: {} });
    this.lastNameModel.destroy({ where: {} });
    this.yearModel.destroy({ where: {} });
    this.jobModel.destroy({ where: {} });
    this.healthModel.destroy({ where: {} });
  }

  async create(person: CreatePersonDTO) {
    const nameId = (
      await this.nameModel.findOrCreate({
        where: { name: person.firstName },
        defaults: { name: person.firstName },
      })
    )[0].id;

    const surnameId = (
      await this.lastNameModel.findOrCreate({
        where: { surname: person.lastName },
        defaults: { surname: person.lastName },
      })
    )[0].id;

    const yearId = (
      await this.yearModel.findOrCreate({
        where: { year: person.year },
        defaults: { year: person.year },
      })
    )[0].id;

    const jobId = (
      await this.jobModel.findOrCreate({
        where: { jobName: person.jobName },
        defaults: { jobName: person.jobName },
      })
    )[0].id;

    const healthId = (
      await this.healthModel.findOrCreate({
        where: { healthType: person.healthType },
        defaults: { healthType: person.healthType },
      })
    )[0].id;

    this.personModel.create({
      nameId,
      surnameId,
      yearId,
      jobId,
      healthId,
    });
  }

  private async getUniqueValues(x: string, y: string, z: string) {
    const allX = await this.findWithOptions({
      attributes: [x],
    });

    const uniqueX = allX
      .map((value) => value[x])
      .filter((value, index, self) => self.indexOf(value) === index);

    const allY = await this.findWithOptions({
      attributes: [y],
    });

    const uniqueY = allY
      .map((value) => value[y])
      .filter((value, index, self) => self.indexOf(value) === index);

    const allZ = await this.findWithOptions({
      attributes: [z],
    });

    const uniqueZ = allZ
      .map((value) => value[z])
      .filter((value, index, self) => self.indexOf(value) === index);

    console.log(uniqueX, uniqueY, uniqueZ);

    return { x: uniqueX, y: uniqueY, z: uniqueZ };
  }

  /**
   * Given three fields, generates all permutations of the unique values for
   * those fields in the database.
   *
   * @param x - The first field
   * @param y - The second field
   * @param z - The third field
   * @returns An array of permutations, each as an object with three fields
   *          (x, y, z) each containing a unique value from the database.
   */
  async getPermutations(x: string, y: string, z: string) {
    const values = await this.getUniqueValues(x, y, z);
    const array = [values.x, values.y, values.z];

    const permutations = array
      .reduce((a, b) =>
        a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), []),
      )
      .map((permutation) => {
        return {
          [x]: permutation[0],
          [y]: permutation[1],
          [z]: permutation[2],
        };
      });
    console.log(permutations);
    return permutations;
  }

  /**
   * Gets the count of unique values for a given axis
   * @param axis the axis to get the count for
   * @returns the count of unique values for the given axis
   */
  async getCountFor(axis: string): Promise<number> {
    return (this.bindModel(axis) as any).count();
  }

  /**
   * Creates a table of permutations split into chunks based on the unique count of the x-axis.
   *
   * @param x - The first field, used as the primary axis for chunking the permutations.
   * @param y - The second field.
   * @param z - The third field.
   * @param operation - The operation details containing the field, value, and aggregator for filtering.
   * @returns An array of permutations split into chunks, where each chunk corresponds to a unique value of the x-axis.
   */
  async createTable(x: string, y: string, z: string, operation: Operation) {
    const xCount = await this.getCountFor(y);
    const array = await this.createPermutations(x, y, z, operation);

    //Get unique values of z
    const uniqueZ = array
      .map((value) => value[z])
      .filter((value, index, self) => self.indexOf(value) === index);

    //Sort by z
    const sorted = array.sort((a, b) => a[z] - b[z]);

    const splitArray = uniqueZ.map((uniqueZ) => {
      return {
        z: uniqueZ,
        items: sorted
          .filter((value) => value[z] == uniqueZ)
          .reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / xCount);

            if (!resultArray[chunkIndex]) {
              resultArray.push([]);
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          }, []),
      };
    });

    return splitArray;
  }

  /**
   * Given a TableBody, generate a 2-dimensional array where the outer array is split by the unique values of z.
   * The inner arrays are split by the primary axis (x) and are sorted by z.
   * @param request - The TableBody containing the definition and query.
   * @returns A 2-dimensional array of permutations split by the unique values of z.
   */
  async createTable2(request: TableBody) {
    this.includeables = this.createIncludeables(request.definition.fields);
    this.model = this.bindFact(request.definition.fact);

    this.returnModel = {
      x: {
        key: request.definition.fields[0].fieldName,
        model: request.definition.fields[0].fieldName,
        value: request.definition.fields[0].valueName,
      },
      y: {
        key: request.definition.fields[1].fieldName,
        model: request.definition.fields[1].fieldName,
        value: request.definition.fields[1].valueName,
      },
      z: {
        key: request.definition.fields[2].fieldName,
        model: request.definition.fields[2].fieldName,
        value: request.definition.fields[2].valueName,
      },
      field: {
        key: request.definition.fields[3].fieldName,
        model: request.definition.fields[3].fieldName,
        value: request.definition.fields[3].valueName,
      },
    };

    const arraySize = await this.getCountFor(request.query.x);
    const array = await this.createPermutations(
      request.query.y,
      request.query.x,
      request.query.z,
      request.query.operation,
    );

    //Get unique values of z
    const uniqueZ = array
      .map((value) => value[request.query.z])
      .filter((value, index, self) => self.indexOf(value) === index);

    //Sort by z
    const sorted = array.sort(
      (a, b) => a[request.query.z] - b[request.query.z],
    );

    const splitArray = uniqueZ.map((uniqueZ) => {
      return {
        z: uniqueZ,
        items: sorted
          .filter((value) => value[request.query.z] == uniqueZ)
          .reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / arraySize);

            if (!resultArray[chunkIndex]) {
              resultArray.push([]);
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          }, []),
      };
    });

    return splitArray;
  }

  private createIncludeables(fields: TableField[]) {
    return fields.map((field) => {
      return {
        model: this.bindModel(field.fieldName),
        as: field.fieldName,
        attributes: [field.valueName],
      };
    });
  }

  private bindFact(fact: string) {
    switch (fact) {
      case 'person':
        return this.personModel;
    }
  }

  private bindModel(field: string) {
    switch (field) {
      case 'firstName':
        return this.nameModel;
      case 'lastName':
        return this.lastNameModel;
      case 'year':
        return this.yearModel;
      case 'job':
        return this.jobModel;
      case 'health':
        return this.healthModel;
      default:
        return null;
    }
  }

  createFieldname(field: string) {
    switch (field) {
      case 'firstName':
        return '$firstName.name$';
      case 'lastName':
        return '$lastName.surname$';
      case 'year':
        return '$year.year$';
      case 'jobName':
        return '$job.jobName$';
      case 'health':
        return '$health.healthType$';
      default:
        return null;
    }
  }

  async createPermutations(
    x: string,
    y: string,
    z: string,
    operation: Operation,
  ) {
    const permutations = await this.getPermutations(x, y, z);
    const createWhereOptions = (permutation: { [x: string]: any }) => {
      const where: WhereOptions = {
        [this.createFieldname(x)]: permutation[x],
        [this.createFieldname(y)]: permutation[y],
        [this.createFieldname(z)]: permutation[z],
      };
      if (operation.aggregator == Aggregator.COUNT) {
        where[this.createFieldname(operation.field)] = operation.value;
      }
      return where;
    };

    if (operation.aggregator == Aggregator.COUNT) {
      return await Promise.all(
        permutations.map(async (permutation) => {
          console.log(createWhereOptions(permutation));
          const result = await this.findWithOptions({
            where: createWhereOptions(permutation),
          });
          return {
            ...permutation,
            result: result.length,
          };
        }),
      );
    }

    switch (operation.aggregator) {
      case Aggregator.SUM:
        return await Promise.all(
          permutations.map(async (permutation) => {
            console.log(createWhereOptions(permutation));
            const result = await this.findWithOptions({
              where: createWhereOptions(permutation),
            });
            return {
              ...permutation,
              result: result.reduce(
                (acc, curr) => acc + curr[operation.field],
                0,
              ),
            };
          }),
        );
    }
  }

  /**
   * This has a problem of not displaying all the permutations if there are rows which don't meet all the conditions
   */
  async createTableLegacy(
    x: string,
    y: string,
    z: string,
    operation: Operation,
  ) {
    const people = await this.personModel.findAll({
      group: [x, y, z],
      attributes: [x, y, z],
      order: [
        [x, 'ASC'],
        [y, 'ASC'],
        [z, 'ASC'],
      ],
    });

    return await Promise.all(
      people.map(async (person) => {
        const count = await this.personModel.count({
          where: {
            [x]: person[x],
            [y]: person[y],
            [z]: person[z],
            [operation.field]: operation.value,
          },
        });
        return {
          [x]: person[x],
          [y]: person[y],
          [z]: person[z],
          result: count,
        };
      }),
    );
  }
}
