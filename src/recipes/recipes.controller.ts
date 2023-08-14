import { Controller, Get, Post, Body } from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { DietRepository } from '../diets/diet.repository';
import { createRecipeDto } from './recipe.dtos';

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipesService: RecipesService,
    private dietRepository: DietRepository,
  ) {}
  @Get()
  getRecipes() {
    return this.recipesService.getAllRecipes();
    // return 'hoy si';
  }
  @Post()
  createRecipe(@Body() payload: createRecipeDto) {
    //const { name, image, summary, healthScore, steps, diets } = req.body
    return this.recipesService.createRecipe(payload);
  }
}
