import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UpdateRawMaterialDto } from '../dto/update-raw_material.dto';
import { RawMaterialService } from '../services/raw_material.service';
import { ApiTags } from '@nestjs/swagger';
import {  UpdateStatusDto } from '../../common/update-status.dto';
import { RawMaterial } from '../entities/raw_material.entity';
import { CreateRawMaterialDto } from 'src/raw_material/dto/create-raw-material.dto';

@Controller('raw-material')
@ApiTags('RAW MATERIAL')
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) { }

  @Post()
  create(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialService.create(createRawMaterialDto);
  }

  @Get()
  findAll() {
    return this.rawMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRawMaterialDto: UpdateRawMaterialDto) {
    return this.rawMaterialService.update(id, updateRawMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialService.remove(id);
  }

  @Patch('status/:id')
  async updateState(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<RawMaterial> {
    return await this.rawMaterialService.updateState(id, updateStatusDto);
  }
}

