import { Controller, Get } from '@nestjs/common';
import { DietsService } from './diets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('diets')
export class DietsController {
  constructor(private dietsService: DietsService) {}

  @Get()
  getDiet() {
    return this.dietsService.findAll();
  }
}
