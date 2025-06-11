import { Module } from '@nestjs/common';
import { SuspensionService } from './suspension.service';
import { SuspensionController } from './suspension.controller';

@Module({
  providers: [SuspensionService],
  controllers: [SuspensionController]
})
export class SuspensionModule {}
