import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    folio: string;

    @Type(() => Number)
    @ApiProperty()
    @IsNumber()
    amount: number;

    @IsArray()
    @IsUUID('all', { each: true })
    @ApiProperty()
    productId: string[];
}
