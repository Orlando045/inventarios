import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnaquelesService } from '../service/anaqueles.service';
import { CreateAnaqueleDto } from '../dto/create-anaquele.dto';
import { UpdateAnaqueleDto } from '../dto/update-anaquele.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('anaqueles')
@ApiTags('ANAQUELES')
export class AnaquelesController {
  constructor(private readonly anaquelesService: AnaquelesService) {}

  @Post()
  create(@Body() createAnaqueleDto: CreateAnaqueleDto) {
    return this.anaquelesService.create(createAnaqueleDto);
  }

  @Get()
  findAll() {
    return this.anaquelesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anaquelesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnaqueleDto: UpdateAnaqueleDto) {
    return this.anaquelesService.update(id, updateAnaqueleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anaquelesService.remove(id);
  }
}
