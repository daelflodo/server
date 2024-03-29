import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, Like } from 'typeorm';
import { GetDataService } from '../get-data/data.service';
import { Recipes } from './recipes.entity';
import { createRecipeDto, UpdateProductDto } from './recipe.dtos';
import { Diet } from '../diets/diets.entity';
import { DietRepository } from '../diets/diet.repository';
import axios from 'axios';

@Injectable()
export class RecipesService {
  private readonly apiKey: string;
  constructor(
    @InjectRepository(Recipes)
    private readonly recipeRepository: Repository<Recipes>,
    @InjectRepository(Diet)
    private readonly dietRepository: DietRepository,
    private readonly getDataService: GetDataService,
    private configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY');
  }
  async getAllRecipes() {
    const dbRecipes = await this.recipeRepository.find({
      relations: ['diets'],
    });
    const dbRecipesFormated = dbRecipes.map((recipe) => ({
      ...recipe,
      diets: recipe.diets.map((diet) => diet.name),
    }));

    const apiRecipes = await this.getDataService.mapApi();
    return [...dbRecipesFormated, ...apiRecipes];
  }

  async getRecipeByName(name: string) {
    const allDb = await this.recipeRepository.find();
    if (!!name[0] && allDb) name = name[0];

    const recipesDb = await this.recipeRepository.find({
      where: {
        name: Like(`%${name}%`), // Utiliza el operador LIKE para buscar nombres que contengan el valor de búsqueda
      },
      // relations: ['diets'],
    });

    const recipeApi = (await this.getDataService.mapApi()).filter((recipe) =>
      recipe.name
        .toLocaleLowerCase()
        .includes(name.toString().toLocaleLowerCase()),
    );

    return [...recipesDb, ...recipeApi];
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

    newRecipe.diets = diets;
    await this.recipeRepository.save(newRecipe);
    return newRecipe;
  }

  async getAllRecipesById(id: any, sourceId: string) {
    const result =
      sourceId === 'API'
        ? (
            await axios(
              `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`,
            )
          ).data
        : await this.recipeRepository.findOne({
            where: {
              id,
            },
            relations: ['diets'],
          });

    if (result && result.diets[0].id) {
      result.diets = result.diets?.map((ele) => ele.name);
    }

    const recipeById = {
      id: result.id,
      name: result.name || result.title,
      image: result.image,
      summary: result.summary,
      healthScore: result.healthScore,
      steps:
        result.steps ||
        result.analyzedInstructions[0]?.steps?.map((ste) => ste.step),
      diets: result.diets,
    };
    return recipeById;
  }

  async remove(id: string) {
    await this.recipeRepository.delete(id);
    return { msg: 'Se elimino correctamente ' };
  }

  async update(id, payload: UpdateProductDto) {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['diets'],
    });
    console.log(recipe);

    Object.assign(recipe, payload);
    return this.recipeRepository.save(recipe);
  }
}
