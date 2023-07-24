import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from '../service/inventory.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from 'src/common/update-status.dto';
import { Inventory } from '../entities/inventory.entity';

@Controller('inventory')
@ApiTags('INVENTORY')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }

  @Patch('status/:id')
  async updateState(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto): Promise<Inventory> {
    return await this.inventoryService.updateState(id, UpdateStatusDto);
  }

  @Get(':id/materias-primas/count')
  async countMateriasPrimas(@Param('id') id: string): Promise<{ materiasPrimas: number, shelf: number, warehouses: number }> {
    return this.inventoryService.countMateriasPrimas(id);
  }
}
