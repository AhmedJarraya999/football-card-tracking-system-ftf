import { CardEvent } from 'src/card-event/card-event.entity';
import { Team } from 'src/team/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  PLAYER = 'player',
  COACH = 'coach',
  STAFF = 'staff',
  PHYSIO = 'physio',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  nationality: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({ type: 'varchar', nullable: true })
  position: string | null;

  @Column({ nullable: true })
  licenseNumber?: string;

  @ManyToOne(() => Team, (team) => team.players)
  team: Team;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => CardEvent, (cardEvent) => cardEvent.player)
  cardEvents: CardEvent[];
}
