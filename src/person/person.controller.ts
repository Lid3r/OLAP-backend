import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePersonDTO } from './model/person.dto';
import { PersonService } from './person.service';
import { Person } from './model/person.model';

@Controller('person')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  @Get()
  getAll(): Promise<Person[]> {
    return this._personService.findAll();
  }

  @Post('/create')
  createPerson(@Body() createPersonDTO: CreatePersonDTO): void {
    this._personService.create(createPersonDTO);
  }
}
