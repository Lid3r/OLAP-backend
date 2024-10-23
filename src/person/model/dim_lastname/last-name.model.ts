import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class LastName extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  surname: string;
}
