import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {}

    async updateBalance(userId: string, amount: number) {
        return this.usersRepository.updateBalance(userId, amount)
    }

}
