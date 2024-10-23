import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { FirstName } from './dim_firstname/first-name.model';
import { LastName } from './dim_lastname/last-name.model';
import { Year } from './dim_years/year.model';
import { Job } from './dim_job/job.model';
import { Health } from './dim_health/health.model';

@Table
export class Person extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @ForeignKey(() => FirstName)
  nameId: number;

  @Column
  @ForeignKey(() => LastName)
  surnameId: number;

  @Column
  @ForeignKey(() => Year)
  yearId: number;

  @Column
  @ForeignKey(() => Job)
  jobId: number;

  @Column
  @ForeignKey(() => Health)
  healthId: number;
}
