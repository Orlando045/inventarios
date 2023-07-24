import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoteOfProductsService } from '../services/lote-of-products.service';
import { CreateLoteOfProductDto } from '../dto/create-lote-of-product.dto';
import { UpdateLoteOfProductDto } from '../dto/update-lote-of-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lote-of-products')
@ApiTags('LOTE_OF_PRODUCTS')
export class LoteOfProductsController {
  constructor(private readonly loteOfProductsService: LoteOfProductsService) {}

  @Post()
  create(@Body() createLoteOfProductDto: CreateLoteOfProductDto) {
    return this.loteOfProductsService.create(createLoteOfProductDto);
  }

  @Get()
  findAll() {
    return this.loteOfProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loteOfProductsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoteOfProductDto: UpdateLoteOfProductDto) {
    return this.loteOfProductsService.update(id, updateLoteOfProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteOfProductsService.remove(id);
  }
}
