import { Module } from '@nestjs/common';
import { RawMaterialController } from './controller/raw_material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw_material.entity';
import { RawMaterialService } from './services/raw_material.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial]), AuthModule],
  controllers: [RawMaterialController],
  providers: [RawMaterialService],
  exports: [TypeOrmModule, RawMaterialService]

})
export class RawMaterialModule {}
