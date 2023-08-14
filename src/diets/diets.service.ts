import { Injectable } from '@nestjs/common';
import { GetDataService } from '../get-data/data.service'; // Asegúrate de proporcionar la ruta correcta
import { Diet } from './diets.entity';

import { DietRepository } from '../diets/diet.repository';
// import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DietsService {
  constructor(
    @InjectRepository(Diet)
    private readonly dietRepository: DietRepository, //DietRepository
    // private dietRepository: Repository<Diet>,

    private readonly getDataService: GetDataService,
  ) {}

  async findAll() {
    let dietsDb = await this.dietRepository.find();
    console.log(this.dietRepository);

    if (!dietsDb.length) {
      const apiInfo = await this.getDataService.mapApi();
      const diets = apiInfo.map((element) => element.diets).flat();
      const allDiets = [];

      console.log('diet', diets);

      diets.forEach((diet) => {
        if (!allDiets.some((element) => element.name === diet)) {
          allDiets.push({ name: diet });
        }
      });
      for (const diet of allDiets) {
        const newDiet = this.dietRepository.create({ name: diet.name });
        await this.dietRepository.save(newDiet);
      }
      dietsDb = await this.dietRepository.find();
    }
    return dietsDb;
  }
}
