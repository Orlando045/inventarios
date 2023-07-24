import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateRawMaterialUsedDto {
    @ApiProperty()
    @IsString()
    folio: string;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @ApiProperty()
    amount: number;

    @ApiProperty()
    @IsArray()
    @IsUUID('all', {each: true})
    rawMId: string[];

}
