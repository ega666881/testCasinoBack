
import {
    PipeTransform,
    Injectable,
    NotFoundException,
    ArgumentMetadata,
  } from '@nestjs/common';
  import { Types } from 'mongoose';

import { UsersRepository } from '../users.repository';

@Injectable()
export class ValidateUserIdPipe implements PipeTransform<string> {
    constructor(private readonly usersRepository: UsersRepository) {}

    async transform(value: string, metadata: ArgumentMetadata) {
        if (!Types.ObjectId.isValid(value)) {
        throw new NotFoundException(`ID "${value}" не верный objectId`);
        }


        const entity = await this.usersRepository.findById(value);
        if (!entity) {
        throw new NotFoundException(`Сущность по ID "${value}" не найдена`);
        }

        return entity; 
    }
}