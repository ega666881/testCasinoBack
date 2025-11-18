import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TowerDocument, TowerSession } from './schemas/tower.schema';
import { Model } from 'mongoose';
import { ITowerUpdateData } from './tower.interface';

@Injectable()
export class TowerRepository {
    constructor(
        @InjectModel(TowerSession.name) private towerSessionModel: Model<TowerDocument>
    ) {}

    async create(userId: string) {
        return this.towerSessionModel.create({
          userId,
          level: 0,
          multiplier: 1.0,
          isFinished: false,
          startedAt: new Date(),
        });
    }

    async findByIdAndUpdate(sessionId: string, updatedData: ITowerUpdateData) {
        return this.towerSessionModel.findByIdAndUpdate(sessionId, updatedData);
    }

    async findActiveSession(userId: string) {
        return this.towerSessionModel.findOne({userId: userId, isFinished: false})
    }

    async findById(sessionId: string) {
        return this.towerSessionModel.findById(sessionId);
    }
}
