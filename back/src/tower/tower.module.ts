import { Module } from '@nestjs/common';
import { TowerService } from './tower.service';
import { TowerController } from './tower.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TowerSession, TowerSessionSchema } from './schemas/tower.schema';
import { TowerRepository } from './tower.repository';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: TowerSession.name, schema: TowerSessionSchema }]),
  ],
  providers: [
    TowerService, 
    TowerRepository
  ],
  controllers: [TowerController]
})
export class TowerModule {}
