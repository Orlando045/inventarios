import { PartialType } from '@nestjs/swagger';
import { CreateRecepcioneDto } from './create-recepcione.dto';

export class UpdateRecepcioneDto extends PartialType(CreateRecepcioneDto) {}
