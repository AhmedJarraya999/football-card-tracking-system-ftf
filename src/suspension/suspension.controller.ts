import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('suspension')
export class SuspensionController {
  @Get()
  findAll() {
    // Return all suspensions
    return 'Get all suspensions';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Return a single suspension by id
    return `Get suspension with id ${id}`;
  }

  @Post()
  create(@Body() createSuspensionDto: any) {
    // Create a new suspension
    return 'Create a new suspension';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSuspensionDto: any) {
    // Update a suspension by id
    return `Update suspension with id ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Delete a suspension by id
    return `Delete suspension with id ${id}`;
  }
}
