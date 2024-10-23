import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './model/person.model';
import { CreatePersonDTO } from './model/person.dto';
import { FirstName } from './model/dim_firstname/first-name.model';
import { LastName } from './model/dim_lastname/last-name.model';
import { Health } from './model/dim_health/health.model';
import { Job } from './model/dim_job/job.model';
import { Year } from './model/dim_years/year.model';

@Injectable()
export class PersonService {
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

  async findAll() {
    return this.personModel.findAll();
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
}
