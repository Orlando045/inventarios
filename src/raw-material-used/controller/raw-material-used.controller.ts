import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RawMaterialUsedService } from '../services/raw-material-used.service';
import { CreateRawMaterialUsedDto } from '../dto/create-raw-material-used.dto';
import { UpdateRawMaterialUsedDto } from '../dto/update-raw-material-used.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('raw-material-used')
@ApiTags('RAW_MATERIAL_USED')
export class RawMaterialUsedController {
  constructor(private readonly rawMaterialUsedService: RawMaterialUsedService) {}

  @Post()
  create(@Body() createRawMaterialUsedDto: CreateRawMaterialUsedDto) {
    return this.rawMaterialUsedService.create(createRawMaterialUsedDto);
  }

  @Get()
  findAll() {
    return this.rawMaterialUsedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialUsedService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRawMaterialUsedDto: UpdateRawMaterialUsedDto) {
    return this.rawMaterialUsedService.update(id, updateRawMaterialUsedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialUsedService.remove(id);
  }
}
