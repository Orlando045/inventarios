import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShelfService } from '../service/shelf.service';
import { CreateShelfDto } from '../dto/create-shelf.dto';
import { UpdateShelfDto } from '../dto/update-shelf.dto';
import { ApiTags } from '@nestjs/swagger';
import { Shelf } from '../entities/shelf.entity';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Controller('shelf')
@ApiTags('SHELF')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) { }

  @Post()
  create(@Body() createShelfDto: CreateShelfDto) {
    return this.shelfService.create(createShelfDto);
  }

  @Get()
  findAll() {
    return this.shelfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelfService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelfDto: UpdateShelfDto) {
    return this.shelfService.update(id, updateShelfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shelfService.remove(id);
  }
  @Patch('status/:id')
  async updateState(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<Shelf> {
    return await this.shelfService.updateState(id, updateStatusDto);
  }
}
