import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Check,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Diet } from '../diets/diets.entity';

@Entity()
@Unique(['name'])
@Check(`"healthScore" >= 0`)
export class Recipes {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  image: string;

  @Column('text', { nullable: false })
  summary: string;

  @Column('int', { unsigned: true })
  healthScore: number;

  @Column('text', { nullable: true })
  steps: string;

  @Column({ default: true })
  created: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  timeStamp: Date;

  @ManyToMany(() => Diet, { cascade: true }) // Define la relación Many-to-Many con Diet
  @JoinTable() // Indica que hay una tabla de unión que conecta las dos entidades
  diets: Diet[];
}
