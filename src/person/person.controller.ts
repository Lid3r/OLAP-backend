import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePersonDTO } from './model/person.dto';
import { PersonService } from './person.service';
import { Operation, TableBody } from './table.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  @Get()
  getAll(): Promise<any[]> {
    return this._personService.findWithOptions();
  }

  @Get('/names')
  getNames(): any {
    return this._personService.getNames();
  }

  @Post('/create')
  createPerson(@Body() createPersonDTO: CreatePersonDTO): void {
    this._personService.create(createPersonDTO);
  }

  @Get('/table')
  createTable(@Query() query): any {
    const x = query['x'];
    const y = query['y'];
    const z = query['z'];
    const operationInfo = {
      field: query['field'],
      value: query['value'],
      aggregator: query['aggregator'],
    } as Operation;
    //This needs to be transposed to display correctly in the table
    return this._personService.createTable(y, x, z, operationInfo);
  }

  @Post('/table2')
  createTable2(@Body() body: TableBody): any {
    //This needs to be transposed to display correctly in the table
    return this._personService.createTable2(body);
  }

  @Delete('/delete')
  obliterate(): void {
    this._personService.obliterate();
  }
}
