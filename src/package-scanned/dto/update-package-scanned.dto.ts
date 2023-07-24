import { PartialType } from '@nestjs/swagger';
import { CreatePackageScannedDto } from './create-package-scanned.dto';

export class UpdatePackageScannedDto extends PartialType(CreatePackageScannedDto) {}
