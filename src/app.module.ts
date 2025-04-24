import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { CardEventModule } from './card-event/card-event.module';

@Module({
  imports: [MatchModule, PlayerModule, CardEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
