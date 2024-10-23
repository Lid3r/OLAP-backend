import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Health extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  healthType: string;
}
