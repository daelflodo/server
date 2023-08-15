import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { createRecipeDto } from './recipe.dtos';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}
  @Get()
  getRecipes(@Query('name') name: string) {
    if (name) return 'tengo name';
    return this.recipesService.getAllRecipes();
  }
  @Get(':id')
  getRecipe(@Param('id') id) {
    const sourceId = isNaN(id) ? 'DB' : 'API';
    return this.recipesService.getAllRecipesById(id, sourceId);
  }

  @Post()
  createRecipe(@Body() payload: createRecipeDto) {
    return this.recipesService.createRecipe(payload);
  }

  @Delete(':id')
  dremoveRecipe(@Param('id') id) {
    return this.recipesService.remove(id);
  }
}
