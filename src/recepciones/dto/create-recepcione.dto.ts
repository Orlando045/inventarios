import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { CreateRegistrarPartidaDto } from './../../registrar-partidas/dto/create-registrar-partida.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { setTimeZone } from 'src/utils/utils.functions';
export class CreateRecepcioneDto {
  @IsString()
  @ApiProperty()
  folio: string;

  @IsBoolean()
  @ApiProperty()
  estadoDelPedido: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  @Transform(setTimeZone, { toClassOnly: true })
  fechaDeLlegada: string;

  @IsOptional()
  @ApiProperty()
  @Type(() => CreateRegistrarPartidaDto)
  registarPartida: CreateRegistrarPartidaDto[];
}
