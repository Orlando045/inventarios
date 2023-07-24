import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufactureOrderService } from '../services/manufacture-order.service';
import { CreateManufactureOrderDto } from '../dto/create-manufacture-order.dto';
import { UpdateManufactureOrderDto } from '../dto/update-manufacture-order.dto';
import { UpdateStatusDto } from 'src/common/update-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { updateStatusOrderDto } from 'src/common/update-status-Order.dto';


@Controller('manufacture-order')
@ApiTags('MANUFACTURE_ORDER')
export class ManufactureOrderController {
  constructor(private readonly manufactureOrderService: ManufactureOrderService) {}

  @Post()
  create(@Body() createManufactureOrderDto: CreateManufactureOrderDto) {
    return this.manufactureOrderService.create(createManufactureOrderDto);
  }

  @Get()
  findAll() {
    return this.manufactureOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufactureOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManufactureOrderDto: UpdateManufactureOrderDto) {
    return this.manufactureOrderService.update(id, updateManufactureOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufactureOrderService.remove(id);
  }
  @Patch('status/:id')
  async updateState(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto) {
    return await this.manufactureOrderService.updateState(id, UpdateStatusDto);
  }
  @Patch('orderStatus/:id')
  async updateOrderStatus(@Param('id') id: string, @Body() order: updateStatusOrderDto) {
    return await this.manufactureOrderService.updateOrderStatus(id, order.order);
  }
}
