import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetDataService } from '../get-data/data.service';
import { Recipes } from './recipes.entity';
import { createRecipeDto } from './recipe.dtos';
// import { Diet } from '../diets/diets.entity';
import { DietRepository } from '../diets/diet.repository';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipeRepository: Repository<Recipes>,
    private readonly dietRepository: DietRepository, //DietRepository
    private readonly getDataService: GetDataService,
  ) {}
  async getAllRecipes() {
    const dbRecipes = await this.recipeRepository.find();
    // return dbRecipes;
    // const formattedRecipes = dbRecipes.map((recipe) => ({
    //   ...recipe,
    //   diets: recipe.diets.map((diet) => diet.name),
    // }));
    const apiRecipes = await this.getDataService.mapApi();
    return [...apiRecipes, ...dbRecipes];
  }

  async createRecipe(payload: createRecipeDto) {
    console.log('Recipe', this.dietRepository);
    if (!payload.name) return { error: 'The name is undefined' };
    if (!payload.diets[0])
      return { error: 'La receta debe tener al menos un tipo de dieta' };

    const recipeFound = await this.recipeRepository.find({
      where: {
        name: payload.name,
      },
    });

    if (recipeFound.length) return { error: 'Recipe name already exists' };
    console.log(recipeFound.length);

    const newRecipe = this.recipeRepository.create({
      name: payload.name,
      image: payload.image,
      summary: payload.summary,
      healthScore: payload.healthScore,
      steps: payload.steps,
    });
    // console.log(this.recipeRepository);
    // console.log('**********************');
    // console.log(this.dietRepository);

    console.log(payload.diets);
    const diets = [];
    for (let i = 0; i < payload.diets.length; i++) {
      const dietdb = await this.dietRepository.findOne({
        where: {
          name: payload.diets[i],
        },
      });
      if (dietdb) diets.push(dietdb);
    }
    console.log('dietdb', diets);

    newRecipe.diets = diets;
    await this.recipeRepository.save(newRecipe);
    return newRecipe;
  }
}
