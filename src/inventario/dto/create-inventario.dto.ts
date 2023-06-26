import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";
import { CommonEntity } from "src/common/common.entity";
import { CreateRecepcioneDto } from "src/recepciones/dto/create-recepcione.dto";

export class CreateInventarioDto extends CommonEntity {
    @IsString()
    @ApiProperty()
    description: string;
    
    @IsArray()
    @IsUUID('all', {each: true})
    @ApiProperty()
    recepcioneId: string[];
    
    @IsArray()
    @IsUUID('all', {each: true})
    @ApiProperty()
    almaceneId: string[];
}
