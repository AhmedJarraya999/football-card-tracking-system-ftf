import { CardEvent } from 'src/card-event/card-event.entity';
import { Team } from 'src/team/team.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, { nullable: false })
  homeTeam: Team;

  @ManyToOne(() => Team, { nullable: false })
  awayTeam: Team;

  @Column({ type: 'date' })
  matchDate: Date;

  @Column({ type: 'time' })
  matchTime: string;

  @Column()
  venue: string;

  @Column({ nullable: true })
  referee: string;

  @Column({ type: 'int', default: 0 })
  homeScore: number;

  @Column({ type: 'int', default: 0 })
  awayScore: number;

  @Column({ default: false })
  isFinished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CardEvent, (cardEvent) => cardEvent.match)
  cardEvents: CardEvent[];
}
