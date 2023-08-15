import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DietRepository } from './diets/diet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DietRepository])],
  exports: [TypeOrmModule],
})
export class SharedModule {}
