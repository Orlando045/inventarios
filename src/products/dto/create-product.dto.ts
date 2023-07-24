import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsArray, IsString, IsUUID } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    name: string;

    @IsArray()
    @ApiProperty()
    @IsUUID('all', {each: true})  
    recipeId: string[];
}
