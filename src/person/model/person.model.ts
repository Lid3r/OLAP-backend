import {
  AutoIncrement,
  BelongsTo,
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

  @BelongsTo(() => FirstName)
  firstName: FirstName;

  @Column
  @ForeignKey(() => FirstName)
  nameId: number;

  @BelongsTo(() => LastName)
  lastName: LastName;

  @Column
  @ForeignKey(() => LastName)
  surnameId: number;

  @BelongsTo(() => Year)
  year: Year;

  @Column
  @ForeignKey(() => Year)
  yearId: number;

  @BelongsTo(() => Job)
  job: Job;

  @Column
  @ForeignKey(() => Job)
  jobId: number;

  @BelongsTo(() => Health)
  health: Health;

  @Column
  @ForeignKey(() => Health)
  healthId: number;
}
