import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateLoteOfProductDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    folio: string;
    
    @IsArray()
    @ApiProperty()
    @IsUUID('all', {each: true})
    produId: string[];

    @IsArray()
    @ApiProperty()
    @IsUUID('all', {each: true})
    materialRId: string[];
}
