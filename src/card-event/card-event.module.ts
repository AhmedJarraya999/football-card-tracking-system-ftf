import { Module } from '@nestjs/common';
import { CardEventService } from './card-event.service';
import { CardEventController } from './card-event.controller';

@Module({
  providers: [CardEventService],
  controllers: [CardEventController]
})
export class CardEventModule {}
