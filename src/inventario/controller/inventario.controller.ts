import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioService } from '../service/inventario.service';
import { CreateInventarioDto } from '../dto/create-inventario.dto';
import { UpdateInventarioDto } from '../dto/update-inventario.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('inventario')
@ApiTags('INVENTARIO')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventarioService.create(createInventarioDto);
  }

  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventarioService.update(+id, updateInventarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }
}
