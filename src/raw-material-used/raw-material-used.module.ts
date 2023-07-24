import { Module } from '@nestjs/common';
import { RawMaterialUsedService } from './services/raw-material-used.service';
import { RawMaterialUsedController } from './controller/raw-material-used.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialUsed } from './entities/raw-material-used.entity';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RawMaterialUsed, RawMaterial])],
  controllers: [RawMaterialUsedController],
  providers: [RawMaterialUsedService]
})
export class RawMaterialUsedModule {}
