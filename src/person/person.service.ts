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

  async migrate() {
    const names = await this.nameModel.bulkCreate([
      { name: 'John' },
      { name: 'Jane' },
      { name: 'Bob' },
      { name: 'Alice' },
      { name: 'Eve' },
      { name: 'Charlie' },
      { name: 'David' },
      { name: 'Frank' },
      { name: 'Grace' },
      { name: 'Heidi' },
      { name: 'Ivy' },
      { name: 'Jack' },
      { name: 'Karl' },
      { name: 'Lily' },
      { name: 'Mary' },
      { name: 'Nina' },
      { name: 'Oliver' },
      { name: 'Peter' },
      { name: 'Quinn' },
      { name: 'Rose' },
      { name: 'Sam' },
      { name: 'Tom' },
      { name: 'Ursula' },
      { name: 'Violet' },
      { name: 'Will' },
      { name: 'Xavier' },
      { name: 'Yvonne' },
      { name: 'Zoe' },
    ]);

    const lastNames = await this.lastNameModel.bulkCreate([
      { surname: 'Smith' },
      { surname: 'Johnson' },
      { surname: 'Williams' },
      { surname: 'Brown' },
      { surname: 'Jones' },
      { surname: 'Garcia' },
      {
        surname: 'Rodriguez',
      },
      { surname: 'Miller' },
      { surname: 'Martinez' },
      { surname: 'Davis' },
      {
        surname: 'Hernandez',
      },
      { surname: 'Lopez' },
      { surname: 'Gonzalez' },
      { surname: 'Wilson' },
      { surname: 'Anderson' },
      { surname: 'Thomas' },
      { surname: 'Taylor' },
      { surname: 'Moore' },
      { surname: 'Jackson' },
      { surname: 'Martin' },
      { surname: 'Lee' },
      { surname: 'Perez' },
      { surname: 'Thompson' },
      { surname: 'White' },
      { surname: 'Harris' },
      { surname: 'Sanchez' },
      { surname: 'Clark' },
      { surname: 'Ramirez' },
    ]);
    const jobs = await this.jobModel.bulkCreate([
      {
        jobName: 'Accountant',
      },
      {
        jobName: 'Actor',
      },
      {
        jobName: 'Actuary',
      },
      {
        jobName: 'Acupuncturist',
      },
      {
        jobName: 'Administrator',
      },
      {
        jobName: 'Agricultural Engineer',
      },
      {
        jobName: 'Agricultural Inspector',
      },
      {
        jobName: 'Agricultural Manager',
      },
      {
        jobName: 'Agricultural Scientist',
      },
      {
        jobName: 'Agricultural Technician',
      },
      {
        jobName: 'Air Traffic Controller',
      },
      {
        jobName: 'Aircraft Maintenance Engineer',
      },
      {
        jobName: 'Aircraft Maintenance Engineer (Avionics)',
      },
      {
        jobName: 'Aircraft Maintenance Engineer (Mechanical)',
      },
      {
        jobName: 'Airline Customer Service Agent',
      },
      {
        jobName: 'Airline Pilot',
      },
      {
        jobName: 'Airline Reservation Agent',
      },
      {
        jobName: 'Ambulance Officer',
      },
      {
        jobName: 'Anaesthetist',
      },
      {
        jobName: 'Animal Attendant',
      },
      {
        jobName: 'Animal Technician',
      },
      {
        jobName: 'Animator',
      },
      {
        jobName: 'Antique Dealer',
      },
      {
        jobName: 'App Developer',
      },
      {
        jobName: 'Arborist',
      },
      {
        jobName: 'Archaeologist',
      },
      {
        jobName: 'Architect',
      },
      {
        jobName: 'Architectural Draftsperson',
      },
      {
        jobName: 'Archivist',
      },
      {
        jobName: 'Art Teacher',
      },
      {
        jobName: 'Artist',
      },
      {
        jobName: 'Arts Administrator',
      },
      {
        jobName: 'Audiologist',
      },
      {
        jobName: 'Author',
      },
      {
        jobName: 'Auto Electrician',
      },
      {
        jobName: 'Automotive Electrician',
      },
      {
        jobName: 'Automotive Electrician (Heavy Vehicles)',
      },
      {
        jobName: 'Automotive Electrician (Light Vehicles)',
      },
      {
        jobName: 'Automotive Electrician (Motorcycles)',
      },
    ]);
    const health = await this.healthModel.bulkCreate([
      {
        healthType: 'Healthy',
      },
      {
        healthType: 'Sick',
      },
      {
        healthType: 'Critical',
      },
      {
        healthType: 'Deceased',
      },
    ]);
    const years = await this.yearModel.bulkCreate([
      { year: 1981 },
      { year: 1982 },
      { year: 1983 },
      { year: 1984 },
      { year: 1985 },
      { year: 1986 },
      { year: 1987 },
      { year: 1988 },
      { year: 1989 },
      { year: 1990 },
      { year: 1991 },
      { year: 1992 },
      { year: 1993 },
      { year: 1994 },
      { year: 1995 },
      { year: 1996 },
      { year: 1997 },
      { year: 1998 },
      { year: 1999 },
      { year: 2000 },
      { year: 2001 },
      { year: 2002 },
      { year: 2003 },
      { year: 2004 },
      { year: 2005 },
      { year: 2006 },
      { year: 2007 },
    ]);

    const people: {
      nameId: number;
      surnameId: number;
      yearId: number;
      jobId: number;
      healthId: number;
    }[] = [];

    for (let i = 0; i < 1000; i++) {
      const nameId = names[Math.floor(Math.random() * names.length)].id;
      const surnameId =
        lastNames[Math.floor(Math.random() * lastNames.length)].id;
      const yearId = years[Math.floor(Math.random() * years.length)].id;
      const jobId = jobs[Math.floor(Math.random() * jobs.length)].id;
      const healthId = health[Math.floor(Math.random() * health.length)].id;

      people.push({
        nameId,
        surnameId,
        yearId,
        jobId,
        healthId,
      });
    }

    return this.personModel.bulkCreate(people);
  }

  /**
   * Finds and retrieves rows from the database based on the provided options,
   * and maps each row to a simplified object containing selected fields.
   *
   * @param options - Optional FindOptions object to customize the query, such as
   *                  filtering, sorting, and pagination.
   * @returns A promise that resolves to an array of objects, each containing the
   *          `id` and selected fields as specified in the `returnModel`.
   */
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

  async obliterate() {
    this.personModel.destroy({ where: {} });
    this.nameModel.destroy({ where: {} });
    this.lastNameModel.destroy({ where: {} });
    this.yearModel.destroy({ where: {} });
    this.jobModel.destroy({ where: {} });
    this.healthModel.destroy({ where: {} });
  }

  /**
   * Creates a new person.
   *
   * @param person The person data to save.
   */
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

  /**
   * Given three fields, fetches all unique values for those fields in the database.
   * @param x The first field.
   * @param y The second field.
   * @param z The third field.
   * @returns An object containing an array of unique values for each field.
   */
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
   * Given a TableBody, generate a 2-dimensional array where the outer array is split by the unique values of z.
   * The inner arrays are split by the primary axis (x) and are sorted by z.
   * @param request - The TableBody containing the definition and query.
   * @returns A 2-dimensional array of permutations split by the unique values of z.
   */
  async createTable(request: TableBody) {
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
    //Transpose data to correctly display in the frontend
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

  /**
   * Given an array of TableField objects, generates an array of Includeable objects
   * that can be passed to Sequelize's `findAndCountAll` method as the `include` option.
   *
   * @param fields - An array of TableField objects, each containing a fieldName
   *                 (the name of the model) and a valueName (the name of the field
   *                 in the model).
   * @returns An array of Includeable objects, each containing a model, as (an alias
   *          for the model), and attributes (an array of field names to include).
   */
  private createIncludeables(fields: TableField[]) {
    return fields.map((field) => {
      return {
        model: this.bindModel(field.fieldName),
        as: field.fieldName,
        attributes: [field.valueName],
      };
    });
  }

  /**
   * Given a fact name, returns the Sequelize model associated with the fact.
   * @param fact - The name of the fact (e.g. 'person').
   * @returns The Sequelize model associated with the fact, or undefined if no match is found.
   */
  private bindFact(fact: string) {
    switch (fact) {
      case 'person':
        return this.personModel;
    }
  }

  /**
   * Given a field name, returns the Sequelize model associated with the field.
   * @param field - The name of the field (e.g. 'firstName', 'lastName', etc.).
   * @returns The Sequelize model associated with the field, or null if no match is found.
   */
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

  /**
   * Given a field name, returns a string that can be used as a Sequelize field name
   * in a SELECT clause. The returned string is in the format `$modelName.fieldName$`.
   * @param field - The name of the field.
   * @returns A string that can be used as a Sequelize field name in a SELECT clause.
   */
  createFieldname(field: string) {
    switch (field) {
      case 'firstName':
        return '$firstName.name$';
      case 'lastName':
        return '$lastName.surname$';
      case 'year':
        return '$year.year$';
      case 'job':
        return '$job.jobName$';
      case 'health':
        return '$health.healthType$';
      default:
        return null;
    }
  }

  /**
   * Generates permutations of unique values for the given fields and
   * applies the specified aggregation operation on each permutation.
   *
   * @param x - The first field.
   * @param y - The second field.
   * @param z - The third field.
   * @param operation - The operation details containing the field, value, and aggregator
   *                    to be used for filtering and computing the result.
   * @returns A promise that resolves to an array of permutations. Each permutation is an object
   *          containing the fields `x`, `y`, `z` and the result of the aggregation operation.
   */

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

    switch (operation.aggregator) {
      case Aggregator.COUNT:
        return await Promise.all(
          permutations.map(async (permutation) => {
            const result = await this.findWithOptions({
              where: createWhereOptions(permutation),
            });
            return {
              ...permutation,
              result: result.length,
            };
          }),
        );

      case Aggregator.SUM:
        return await Promise.all(
          permutations.map(async (permutation) => {
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

      case Aggregator.AVG:
        return await Promise.all(
          permutations.map(async (permutation) => {
            const result = await this.findWithOptions({
              where: createWhereOptions(permutation),
            });
            return {
              ...permutation,
              result:
                result.reduce((acc, curr) => acc + curr[operation.field], 0) /
                result.length,
            };
          }),
        );

      case Aggregator.MIN:
        return await Promise.all(
          permutations.map(async (permutation) => {
            const result = await this.findWithOptions({
              where: createWhereOptions(permutation),
            });
            return {
              ...permutation,
              result: Math.min(...result.map((row) => row[operation.field])),
            };
          }),
        );

      case Aggregator.MAX:
        return await Promise.all(
          permutations.map(async (permutation) => {
            const result = await this.findWithOptions({
              where: createWhereOptions(permutation),
            });
            return {
              ...permutation,
              result: Math.max(...result.map((row) => row[operation.field])),
            };
          }),
        );
    }
  }

  /**
   * @deprecated
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

  /**
   * @deprecated
   * Creates a table of permutations split into chunks based on the unique count of the x-axis.
   * This one had the problem of not being generic.
   *
   * @param x - The first field, used as the primary axis for chunking the permutations.
   * @param y - The second field.
   * @param z - The third field.
   * @param operation - The operation details containing the field, value, and aggregator for filtering.
   * @returns An array of permutations split into chunks, where each chunk corresponds to a unique value of the x-axis.
   */
  async createTableLegacy2(
    x: string,
    y: string,
    z: string,
    operation: Operation,
  ) {
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
}
