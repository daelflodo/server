import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

export interface Recipe {
  id: number;
  name: string;
  diets: string[];
  image: string;
  summary: string;
  healthScore: number;
  steps: string[];
  created: boolean;
}

@Injectable()
export class GetDataService {
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
  }

  async mapApi(): Promise<Recipe[]> {
    try {
      const apiData = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}&number=100&addRecipeInformation=true`,
      );
      const mapRecipes: Recipe[] = apiData.data.results.map((element: any) => {
        return {
          id: element.id,
          name: element.title,
          diets: element.diets,
          image: element.image,
          summary: element.summary,
          healthScore: element.healthScore,
          steps:
            element.analyzedInstructions[0]?.steps?.map(
              (ste: any) => ste.step,
            ) || [],
          created: false,
        };
      });
      return mapRecipes;
    } catch (error) {
      throw new Error('Error fetching data from API: ' + error.message);
    }
  }
}
