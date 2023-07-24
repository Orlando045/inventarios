import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateScannedOrderDto {


    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    amountPackage: number

    @IsArray()
    @ApiProperty()
    @IsUUID('all', {each: true})
    materId : string[];
}
