import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Job extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  jobName: string;
}
