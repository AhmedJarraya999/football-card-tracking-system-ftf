import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('player')
export class PlayerController {
  @Get()
  findAll(): string {
    return 'This action returns all players';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a player with id ${id}`;
  }

  @Post()
  create(@Body() createPlayerDto: any): string {
    return 'This action adds a new player';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: any): string {
    return `This action updates a player with id ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a player with id ${id}`;
  }
}
