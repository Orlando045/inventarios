import { PartialType } from '@nestjs/swagger';
import { CreateRawMaterialRequiredDto } from './create-raw-material-required.dto';

export class UpdateRawMaterialRequiredDto extends PartialType(CreateRawMaterialRequiredDto) {}
