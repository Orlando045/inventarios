import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackageScannedService } from '../services/package-scanned.service';
import { CreatePackageScannedDto } from '../dto/create-package-scanned.dto';
import { UpdatePackageScannedDto } from '../dto/update-package-scanned.dto';

@Controller('package-scanned')
export class PackageScannedController {
  constructor(private readonly packageScannedService: PackageScannedService) {}

  @Post()
  create(@Body() createPackageScannedDto: CreatePackageScannedDto) {
    return this.packageScannedService.create(createPackageScannedDto);
  }

  @Get()
  findAll() {
    return this.packageScannedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageScannedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageScannedDto: UpdatePackageScannedDto) {
    return this.packageScannedService.update(+id, updatePackageScannedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageScannedService.remove(+id);
  }
}
