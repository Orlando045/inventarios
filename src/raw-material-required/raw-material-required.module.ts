import { Module } from '@nestjs/common';
import { RawMaterialRequiredService } from './services/raw-material-required.service';
import { RawMaterialRequiredController } from './controller/raw-material-required.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialRequired } from './entities/raw-material-required.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterialRequired, Inventory, RawMaterial])],
  controllers: [RawMaterialRequiredController],
  providers: [RawMaterialRequiredService]
})
export class RawMaterialRequiredModule {}
