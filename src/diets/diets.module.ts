import { Module } from '@nestjs/common';

import { DietsController } from './diets.controller';
import { DietsService } from './diets.service';
import { GetDataService } from '../get-data/data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from './diets.entity';
import { DietRepository } from '../diets/diet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Diet, DietRepository])],
  controllers: [DietsController],
  providers: [DietsService, GetDataService, DietRepository],
  exports: [DietsService, DietRepository],
})
export class DietsModule {}
