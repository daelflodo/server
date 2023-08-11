import { Entity, PrimaryGeneratedColumn, Column, Unique, Check } from 'typeorm';

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

  @Column({ default: false })
  created: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  timeStamp: Date;
}
