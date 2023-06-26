import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateRegistrarPartidaDto {
  @IsArray()
  @IsUUID('all', {each: true})
  @ApiProperty()
  materiasPrimaId: string[];

  @IsNumber()
  @ApiProperty()
  cantidad: number;
}
