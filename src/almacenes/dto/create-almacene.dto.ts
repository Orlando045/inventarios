import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";

export class CreateAlmaceneDto {
    @IsString()
    @ApiProperty()
    nombre : string;

    @IsString()
    @ApiProperty()
    description : string; 

    @IsArray()
    @IsUUID('all', { each : true})
    @ApiProperty()
    anaqueleId: string[];
 
}
