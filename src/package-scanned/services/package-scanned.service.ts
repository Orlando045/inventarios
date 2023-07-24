import { Injectable, Logger } from '@nestjs/common';
import { CreatePackageScannedDto } from '../dto/create-package-scanned.dto';
import { UpdatePackageScannedDto } from '../dto/update-package-scanned.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageScanned } from '../entities/package-scanned.entity';
import { Repository } from 'typeorm';
import { ScannedOrder } from 'src/scanned-order/entities/scanned-order.entity';

@Injectable()
export class PackageScannedService {
private readonly logger = new  Logger('PackageScannedService')

constructor(
  @InjectRepository(PackageScanned)
  private readonly _packageScannedRepository: Repository<PackageScanned>,
  @InjectRepository(ScannedOrder)
  private readonly _scannedOrderRepository: Repository<ScannedOrder>,

){}

  async create(createPackageScannedDto: CreatePackageScannedDto) {
    const newPackage = await this._packageScannedRepository.create(createPackageScannedDto)
    let packageScanned : PackageScanned;

    // const list : ScannedOrder[] =  [];
    // for(const id of createPackageScannedDto.)

  }

  findAll() {
    return `This action returns all packageScanned`;
  }

  findOne(id: number) {
    return `This action returns a #${id} packageScanned`;
  }

  update(id: number, updatePackageScannedDto: UpdatePackageScannedDto) {
    return `This action updates a #${id} packageScanned`;
  }

  remove(id: number) {
    return `This action removes a #${id} packageScanned`;
  }
}
