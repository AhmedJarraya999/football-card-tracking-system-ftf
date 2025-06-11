import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { CardEventModule } from './card-event/card-event.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { TeamModule } from './team/team.module';
import { SuspensionModule } from './suspension/suspension.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Or your chosen database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '24149100',
      database: 'football_tracker',
      entities: [User],
      synchronize: true,
    }),
    MatchModule,
    PlayerModule,
    CardEventModule,
    UserModule,
    TeamModule,
    SuspensionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
