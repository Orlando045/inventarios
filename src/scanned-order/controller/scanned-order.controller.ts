import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScannedOrderService } from '../services/scanned-order.service';
import { CreateScannedOrderDto } from '../dto/create-scanned-order.dto';
import { UpdateScannedOrderDto } from '../dto/update-scanned-order.dto';

@Controller('scanned-order')
export class ScannedOrderController {
  constructor(private readonly scannedOrderService: ScannedOrderService) {}

  @Post()
  create(@Body() createScannedOrderDto: CreateScannedOrderDto) {
    return this.scannedOrderService.create(createScannedOrderDto);
  }

  @Get()
  findAll() {
    return this.scannedOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scannedOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScannedOrderDto: UpdateScannedOrderDto) {
    return this.scannedOrderService.update(id, updateScannedOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scannedOrderService.remove(id);
  }
}
