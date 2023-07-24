import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateWarehouseDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    name: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    description: string;

    @IsArray()
    @IsUUID('all', { each: true })
    @ApiProperty()
    shelfId: string[];
}
