import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { updateStatusOrderDto } from 'src/common/update-status-Order.dto';
import { Product } from '../entities/product.entity';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Controller('products')
@ApiTags('PRODUCTS')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  @Patch('status/:id')
  async updateState(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto) {
    return await this.productsService.updateState(id, UpdateStatusDto);
  }
  @Patch('orderStatus/:id')
  async updateOrderStatus(@Param('id') id: string, @Body() order: updateStatusOrderDto): Promise<Product> {
    return await this.productsService.updateOrderStatus(id, order.order);
  }
}
