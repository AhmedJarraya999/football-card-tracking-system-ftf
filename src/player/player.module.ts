import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  providers: [PlayerService],
  controllers: [PlayerController]
})
export class PlayerModule {}
