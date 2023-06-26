import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMateriasPrimaDto } from './create-materias-prima.dto';
import { IsBoolean } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateMateriasPrimaDto extends PartialType(CreateMateriasPrimaDto) {
    @ApiProperty()
    @IsBoolean()
    @Optional()
    status: boolean;
}
