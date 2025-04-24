import { Test, TestingModule } from '@nestjs/testing';
import { CardEventService } from './card-event.service';

describe('CardEventService', () => {
  let service: CardEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardEventService],
    }).compile();

    service = module.get<CardEventService>(CardEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
