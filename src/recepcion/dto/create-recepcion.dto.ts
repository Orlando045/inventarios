import { IsArray, IsBoolean, IsBooleanString, IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { setTimeZone } from 'src/utils/utils.functions';
import { Recepcion } from '../entities/recepcion.entity';


export class CreateRecepcionDto {
  @IsString()
  @ApiProperty()
  folio: string;
  // @ApiProperty()
  // orderStatus: string;
  @IsOptional()
  @IsDateString()
  @ApiProperty()
  @Transform(setTimeZone, { toClassOnly: true })
  arrivalDate: string;
  @IsArray()
  @IsUUID('all', { each: true })
  @ApiProperty()
  registerOutId: string[];
}
