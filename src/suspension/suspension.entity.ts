import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Player } from '../player/player.entity';
import { Match } from '../match/match.entity';

export enum SuspensionStatus {
  ACTIVE = 'active',
  SERVED = 'served',
}

@Entity('suspensions')
export class Suspension {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Match, { eager: true })
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'enum',
    enum: SuspensionStatus,
    default: SuspensionStatus.ACTIVE,
  })
  status: SuspensionStatus;
}
