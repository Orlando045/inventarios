import { Module } from '@nestjs/common';
import { InventoryService } from './service/inventory.service';
import { InventoryController } from './controller/inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { RawMaterialModule } from 'src/raw_material/raw_material.module';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';
import { WarehouseModule } from 'src/warehouse/warehouse.module';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { Shelf } from 'src/shelf/entities/shelf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, RawMaterial, Warehouse, Shelf])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
