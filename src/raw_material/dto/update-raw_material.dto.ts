import { PartialType } from '@nestjs/swagger';
import { CreateRawMaterialDto } from 'src/raw_material/dto/create-raw-material.dto';


export class UpdateRawMaterialDto extends PartialType(CreateRawMaterialDto) {}
