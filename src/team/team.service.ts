import { Injectable } from '@nestjs/common';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  private teams: Team[] = [];
  createTeam(team: Team): Team {
    this.teams.push(team);
    return team;
  }

  getAllTeams(): Team[] {
    return this.teams;
  }

  getTeamById(id: number): Team | undefined {
    return this.teams.find((team) => team.id === id.toString());
  }

  updateTeam(id: number, updatedTeam: Partial<Team>): Team | undefined {
    const teamIndex = this.teams.findIndex((team) => team.id === id.toString());
    if (teamIndex === -1) return undefined;

    this.teams[teamIndex] = { ...this.teams[teamIndex], ...updatedTeam };
    return this.teams[teamIndex];
  }

  deleteTeam(id: number): boolean {
    const teamIndex = this.teams.findIndex((team) => Number(team.id) === id);
    if (teamIndex === -1) return false;

    this.teams.splice(teamIndex, 1);
    return true;
  }
  findOne(id: string) {
    // Implement the logic to find a team by its ID
    return `This action returns a team with id: ${id}`;
  }
}
