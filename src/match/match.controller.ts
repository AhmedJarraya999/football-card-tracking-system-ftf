import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('match')
export class MatchController {
  // Example: Get all matches
  @Get()
  findAll() {
    // Implementation here
    return 'This action returns all matches';
  }

  // Example: Get a single match by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Implementation here
    return `This action returns a match with id: ${id}`;
  }

  // Example: Create a new match
  @Post()
  create(@Body() createMatchDto: any) {
    // Implementation here
    return 'This action adds a new match';
  }

  // Example: Update a match
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: any) {
    // Implementation here
    return `This action updates a match with id: ${id}`;
  }

  // Example: Delete a match
  @Delete(':id')
  remove(@Param('id') id: string) {
    // Implementation here
    return `This action removes a match with id: ${id}`;
  }
}
