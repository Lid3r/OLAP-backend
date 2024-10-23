import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './model/person.model';
import { FirstName } from './model/dim_firstname/first-name.model';
import { Health } from './model/dim_health/health.model';
import { Job } from './model/dim_job/job.model';
import { LastName } from './model/dim_lastname/last-name.model';
import { Year } from './model/dim_years/year.model';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Person,
      FirstName,
      LastName,
      Year,
      Job,
      Health,
    ]),
  ],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
