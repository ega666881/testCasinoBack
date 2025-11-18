import { Test, TestingModule } from '@nestjs/testing';
import { TowerController } from './tower.controller';

describe('TowerController', () => {
  let controller: TowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TowerController],
    }).compile();

    controller = module.get<TowerController>(TowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
