import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreatePersonDTO } from './model/person.dto';
import { PersonService } from './person.service';
import { TableBody } from './table.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  @Get()
  getAll(): Promise<any[]> {
    return this._personService.findWithOptions();
  }

  @Post('/create')
  createPerson(@Body() createPersonDTO: CreatePersonDTO): void {
    this._personService.create(createPersonDTO);
  }

  @Get('/migrate')
  migrate() {
    return this._personService.migrate();
  }

  @Post('/table')
  createTable2(@Body() body: TableBody): any {
    //This needs to be transposed to display correctly in the table
    return this._personService.createTable(body);
  }

  @Delete('/delete')
  obliterate(): void {
    this._personService.obliterate();
  }
}
