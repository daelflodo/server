import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Recipes } from '../recipes/recipes.entity';
import { Recipe } from 'src/get-data/data.service';

@Entity()
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) //no null
  name: string;
  @ManyToMany(() => Recipes, (recipes) => recipes.diets)
  recipes: Recipe[];
}
