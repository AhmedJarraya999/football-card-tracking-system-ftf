import { Test, TestingModule } from '@nestjs/testing';
import { CardEventController } from './card-event.controller';

describe('CardEventController', () => {
  let controller: CardEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardEventController],
    }).compile();

    controller = module.get<CardEventController>(CardEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
