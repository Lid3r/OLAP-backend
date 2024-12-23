export enum Aggregator {
  SUM = 'SUM',
  AVG = 'AVG',
  COUNT = 'COUNT',
  MIN = 'MIN',
  MAX = 'MAX',
}

export interface TableDefinition {
  fact: string;
  fields: TableField[];
}

export interface TableField {
  fieldName: string;
  valueName: string;
}

export interface Operation {
  field: string;
  value: number | string;
  aggregator: Aggregator;
}

export interface TableQuery {
  x: string;
  y: string;
  z: string;
  operation: Operation;
}
export interface TableBody {
  definition: TableDefinition;
  query: TableQuery;
}
