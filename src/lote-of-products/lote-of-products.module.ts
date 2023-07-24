import { Module } from '@nestjs/common';
import { LoteOfProductsService } from './services/lote-of-products.service';
import { LoteOfProductsController } from './controller/lote-of-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteOfProduct } from './entities/lote-of-product.entity';
import { Product } from 'src/products/entities/product.entity';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LoteOfProduct, Product, RawMaterial])],
  controllers: [LoteOfProductsController],
  providers: [LoteOfProductsService]
})
export class LoteOfProductsModule {}
