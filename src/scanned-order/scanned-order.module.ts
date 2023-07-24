import { Module } from '@nestjs/common';
import { ScannedOrderService } from './services/scanned-order.service';
import { ScannedOrderController } from './controller/scanned-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScannedOrder } from './entities/scanned-order.entity';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ScannedOrder, RawMaterial])],
  controllers: [ScannedOrderController],
  providers: [ScannedOrderService]
})
export class ScannedOrderModule {}
