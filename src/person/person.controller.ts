import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePersonDTO } from './model/person.dto';
import { Operation, PersonService } from './person.service';

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

  @Delete('/delete')
  obliterate(): void {
    this._personService.obliterate();
  }
}
