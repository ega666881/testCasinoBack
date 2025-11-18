
import {
    PipeTransform,
    Injectable,
    NotFoundException,
    ArgumentMetadata,
  } from '@nestjs/common';
  import { Types } from 'mongoose';

import { TowerRepository } from '../tower.repository';

@Injectable()
export class ValidateTowerIdPipe implements PipeTransform<string> {
    constructor(private readonly towerRepository: TowerRepository) {}

    async transform(value: string, metadata: ArgumentMetadata) {
        if (!Types.ObjectId.isValid(value)) {
            throw new NotFoundException(`ID "${value}" не верный objectId`);
        }


        const entity = await this.towerRepository.findById(value);
        if (!entity) {
            throw new NotFoundException(`Сущность по ID "${value}" не найдена`);
        }

        return entity; 
    }
}