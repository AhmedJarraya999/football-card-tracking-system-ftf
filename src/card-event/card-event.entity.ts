import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from '../match/match.entity';
import { Player } from '../player/player.entity';

export enum CardType {
  YELLOW = 'yellow',
  RED = 'red',
}

@Entity()
export class CardEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CardType,
  })
  type: CardType;

  @ManyToOne(() => Match, (match) => match.cardEvents, { nullable: false })
  match: Match;

  @ManyToOne(() => Player, (player) => player.cardEvents, { nullable: false })
  player: Player;
}
