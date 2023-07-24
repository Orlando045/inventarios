import { Module } from '@nestjs/common';
import { PackageScannedService } from './services/package-scanned.service';
import { PackageScannedController } from './controller/package-scanned.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageScanned } from './entities/package-scanned.entity';
import { ScannedOrder } from 'src/scanned-order/entities/scanned-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageScanned, ScannedOrder])],
  controllers: [PackageScannedController],
  providers: [PackageScannedService]
})
export class PackageScannedModule { }
