import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Year extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  year: number;
}
