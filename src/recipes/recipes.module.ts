import { Module } from '@nestjs/common';

import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipes } from './recipes.entity';
import { Diet } from '../diets/diets.entity';
import { GetDataService } from '../get-data/data.service';
import { DietRepository } from '../diets/diet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Recipes, Diet])], //*
  controllers: [RecipesController],
  providers: [RecipesService, GetDataService, DietRepository], //*DietRepository
  exports: [RecipesService],
})
export class RecipesModule {}
