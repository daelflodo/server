import { EntityRepository, Repository } from 'typeorm';
import { Diet } from './diets.entity';

@EntityRepository(Diet)
export class DietRepository extends Repository<Diet> {
  // Agrega métodos personalizados para operaciones relacionadas con la entidad Diet
}
