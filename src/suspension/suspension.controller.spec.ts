import { Test, TestingModule } from '@nestjs/testing';
import { SuspensionController } from './suspension.controller';

describe('SuspensionController', () => {
  let controller: SuspensionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuspensionController],
    }).compile();

    controller = module.get<SuspensionController>(SuspensionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
