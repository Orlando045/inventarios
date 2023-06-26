import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';


export class CreateMateriasPrimaDto {


    @IsString()
    @ApiProperty()
    nombre: string;

    @IsString()
    @ApiProperty()
    idScaneo: string;

    @IsString()
    @ApiProperty()
    descripcion: string;
   
}
