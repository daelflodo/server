import { Module } from '@nestjs/common';

import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [],
})
export class RecipesModule {}
