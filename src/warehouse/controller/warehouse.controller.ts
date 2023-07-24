import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { WarehouseService } from '../service/warehouse.service';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from 'src/common/update-status.dto';
import { Warehouse } from '../entities/warehouse.entity';

@Controller('warehouse')
@ApiTags('WAREHOUSE')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(id);
  }

  @Patch('status/:id')
  async updateState(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<Warehouse> {
    return await this.warehouseService.updateState(id, updateStatusDto);
  }
}

