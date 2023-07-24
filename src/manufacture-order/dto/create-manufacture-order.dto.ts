import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateManufactureOrderDto {
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @ApiProperty()
    amount: number;

    @IsArray()
    @IsUUID('all', { each: true })
    @ApiProperty()
    productsId: string[];
}
