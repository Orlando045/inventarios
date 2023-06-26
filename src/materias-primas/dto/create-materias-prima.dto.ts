import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';


export class CreateMateriasPrimaDto {


    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    scaneId: string;

    @IsString()
    @ApiProperty()
    description: string;
   
}
