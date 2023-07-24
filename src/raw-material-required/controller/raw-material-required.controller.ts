import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RawMaterialRequiredService } from '../services/raw-material-required.service';
import { CreateRawMaterialRequiredDto } from '../dto/create-raw-material-required.dto';
import { UpdateRawMaterialRequiredDto } from '../dto/update-raw-material-required.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('raw-material-required')
@ApiTags('RAW_MATERIAL_REQUIRED')
export class RawMaterialRequiredController {
  constructor(private readonly rawMaterialRequiredService: RawMaterialRequiredService) {}

  @Post()
  create(@Body() createRawMaterialRequiredDto: CreateRawMaterialRequiredDto) {
    return this.rawMaterialRequiredService.create(createRawMaterialRequiredDto);
  }

  @Get()
  findAll() {
    return this.rawMaterialRequiredService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialRequiredService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRawMaterialRequiredDto: UpdateRawMaterialRequiredDto) {
    return this.rawMaterialRequiredService.update(id, updateRawMaterialRequiredDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialRequiredService.remove(id);
  }
}
