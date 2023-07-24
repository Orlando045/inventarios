import { Module } from '@nestjs/common';
import { WarehouseService } from './service/warehouse.service';
import { WarehouseController } from './controller/warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Shelf } from 'src/shelf/entities/shelf.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Warehouse, Shelf])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports:[TypeOrmModule, WarehouseService]
})
export class WarehouseModule {}
