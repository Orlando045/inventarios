import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateRecipeDto {
    
    @Type(() => Number)
    @ApiProperty()
    @IsNumber()
    amount_to_use: number;

    @IsArray()
    @IsUUID('all', { each: true })
    @ApiProperty()
    materialId: string[];
}
