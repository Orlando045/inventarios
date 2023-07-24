import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
