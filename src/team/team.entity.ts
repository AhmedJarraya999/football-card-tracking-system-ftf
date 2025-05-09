import { Player } from 'src/player/player.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column({ nullable: true })
  foundationYear?: number;

  @Column({ nullable: true })
  clubColors?: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ nullable: true })
  homeStadium?: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
