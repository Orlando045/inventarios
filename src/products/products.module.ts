import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Recipe])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
