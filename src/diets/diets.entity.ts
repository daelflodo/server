import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}
