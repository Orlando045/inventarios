import { Module } from '@nestjs/common';
import { ManufactureOrderService } from './services/manufacture-order.service';
import { ManufactureOrderController } from './controller/manufacture-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufactureOrder } from './entities/manufacture-order.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManufactureOrder, Product])],
  controllers: [ManufactureOrderController],
  providers: [ManufactureOrderService]
})
export class ManufactureOrderModule {}
