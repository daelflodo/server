import { Module } from '@nestjs/common';
// import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DietsController } from './diets/diets.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; //paso 1 importar
import { DietsModule } from './diets/diets.module';
import { GetDataService } from './get-data/data.service';
import { enviroments } from './enviroments';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesModule } from './recipes/recipes.module';
import { Diet } from './diets/diets.entity';
import { DietRepository } from './diets/diet.repository';
import { SharedModule } from './shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1489',
      database: 'db_food',
      entities: ['dist/**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'], // lee culaquier archivo q se llame entity y sea ts o js para crear las tablas
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      validationSchema: joi.object({
        API_KEY: joi.string().required(),
        // DATABASE_NAME: joi.string().required(),
        // PORT: joi.string().required(),
      }),
    }),
    DietsModule,
    RecipesModule,
    TypeOrmModule.forFeature([Diet, DietRepository]),
    SharedModule, //*DietRepository
  ],
  controllers: [AppController, DietsController, RecipesController],
  providers: [AppService, GetDataService],
})
export class AppModule {
  constructor() {}
}
