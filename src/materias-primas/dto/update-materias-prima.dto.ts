import { PartialType } from '@nestjs/swagger';
import { CreateMateriasPrimaDto } from './create-materias-prima.dto';

export class UpdateMateriasPrimaDto extends PartialType(CreateMateriasPrimaDto) {}
