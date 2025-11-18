import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TowerRepository } from './tower.repository';
import { UsersRepository } from 'src/users/users.repository';
import { TowerSession } from './schemas/tower.schema';

@Injectable()
export class TowerService {
    constructor(
        private readonly towerRepository: TowerRepository,
        private readonly usersRepository: UsersRepository
    ) {}

    private MULTIPLIERS = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

    async startGame(userId: string) {
        return this.towerRepository.create(userId)
    }

    async chooseDoor(userId: string) {
        const session = await this.towerRepository.findActiveSession(userId)

        
        if (!session || session.level >= 8 || session.isFinished) {
          throw new HttpException('Игра завершена', HttpStatus.CONFLICT);
        }
        const currentLevel = session.level
        const isCorrect = Math.random() > 0.5;
    
        if (!isCorrect) {

          await this.towerRepository.findByIdAndUpdate(session._id.toString(), { isFinished: true });
          return { success: false, multiplier: session.multiplier, won: 0 };
        }

        const nextLevel = currentLevel + 1;
        const nextMultiplier = this.MULTIPLIERS[nextLevel];

        await this.towerRepository.findByIdAndUpdate(session._id.toString(), {
            level: nextLevel,
            multiplier: nextMultiplier,
            ...(nextLevel === 8 && { isFinished: true }),
        });

        return {
            success: true,
            level: nextLevel,
            multiplier: nextMultiplier,
        };
    }

    async cashout(userId: string) {
        const session = await this.towerRepository.findActiveSession(userId)
        if (!session || session.isFinished) {
            throw new HttpException('Игра завершена', HttpStatus.CONFLICT);
          }

        const won = session.multiplier; 
    
        await this.usersRepository.updateBalance(userId, won);
    
        await this.towerRepository.findByIdAndUpdate(session._id.toString(), { isFinished: true });
    
        return { cashedOut: true, amount: won };
      }
}
