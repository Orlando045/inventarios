import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RecepcionService } from '../service/recepcion.service';
import { CreateRecepcionDto } from '../dto/create-recepcion.dto';
import { UpdateRecepcionDto } from '../dto/update-recepcion.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from 'src/common/update-status.dto';
import { Recepcion } from '../entities/recepcion.entity';

import { updateStatusOrderDto } from 'src/common/update-status-Order.dto';

@Controller('recepcion')
@ApiTags('RECEPCION')
export class RecepcionController {
  constructor(private readonly recepcionService: RecepcionService) {}

  @Post()
  create(@Body() createRecepcionDto: CreateRecepcionDto) {
    return this.recepcionService.create(createRecepcionDto);
  }

  @Get()
  findAll() {
    return this.recepcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recepcionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecepcionDto: UpdateRecepcionDto) {
    return this.recepcionService.update(id, updateRecepcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recepcionService.remove(id);
  }
  
  @Patch('status/:id')
  async updateState(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto): Promise<Recepcion> {
    return await this.recepcionService.updateState(id, UpdateStatusDto);
  }
  @Patch('orderStatus/:id')
async updateOrderStatus(@Param('id') id: string, @Body() order: updateStatusOrderDto): Promise<Recepcion> {
  return await this.recepcionService.updateOrderStatus(id, order.order);
}
}