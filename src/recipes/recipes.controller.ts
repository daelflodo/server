import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { createRecipeDto, UpdateProductDto } from './recipe.dtos';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}
  @Get()
  getRecipes(@Query('name') name: string) {
    //console.log('nombre,', name[0]); //Esto siempre imprime c
    if (name[0] !== 'c') return this.recipesService.getRecipeByName(name);
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
  removeRecipe(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Put(':id')
  updateRecipe(@Param('id') id, @Body() payload: UpdateProductDto) {
    return this.recipesService.update(id, payload);
  }
}
