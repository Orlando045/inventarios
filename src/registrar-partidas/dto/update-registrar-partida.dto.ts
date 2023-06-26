import { PartialType } from '@nestjs/swagger';
import { CreateRegistrarPartidaDto } from './create-registrar-partida.dto';

export class UpdateRegistrarPartidaDto extends PartialType(CreateRegistrarPartidaDto) {}
