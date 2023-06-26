import { PartialType } from '@nestjs/swagger';
import { CreateAlmaceneDto } from './create-almacene.dto';

export class UpdateAlmaceneDto extends PartialType(CreateAlmaceneDto) {}
