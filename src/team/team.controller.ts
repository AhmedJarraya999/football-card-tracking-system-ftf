import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team-dto';
import { Team } from './team.entity';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    const team: Team = {
      id: crypto.randomUUID(), // Automatically generate a unique ID
      shortName: createTeamDto.shortName,
      country: createTeamDto.country,
      isActive: true, // Default value or map from DTO if available
      name: createTeamDto.name || '', // Map or provide a default value
      city: createTeamDto.city || '', // Map or provide a default value
      createdAt: new Date(), // Assign current date as default
      updatedAt: new Date(), // Assign current date as default
      players: createTeamDto.players || [], // Map or provide an empty array as default
    };
    return this.teamService.createTeam(team);
  }

  @Get()
  findAll() {
    return this.teamService.getAllTeams();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }
}
