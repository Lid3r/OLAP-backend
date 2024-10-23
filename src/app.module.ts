import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './person/model/person.model';
import { FirstName } from './person/model/dim_firstname/first-name.model';
import { LastName } from './person/model/dim_lastname/last-name.model';
import { Health } from './person/model/dim_health/health.model';
import { Job } from './person/model/dim_job/job.model';
import { Year } from './person/model/dim_years/year.model';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'olap',
      password: '12Postgres3!',
      database: 'postgres',
      synchronize: true,
      models: [Person, FirstName, LastName, Year, Job, Health],
    }),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
