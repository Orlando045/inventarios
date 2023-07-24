import { PartialType } from '@nestjs/swagger';
import { CreateRawMaterialUsedDto } from './create-raw-material-used.dto';

export class UpdateRawMaterialUsedDto extends PartialType(CreateRawMaterialUsedDto) {}
