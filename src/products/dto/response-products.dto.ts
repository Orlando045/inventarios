import { Exclude, Expose } from "class-transformer";
import { IsArray, IsString } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseRecipeDto } from "src/recipe/dto/response-recipe.dto";

Exclude()
export class ResponseProducrtsDto extends CommonResponseDto{
    @Expose()
    @IsString()
    readonly name: string;

    @Expose()
    readonly orderStatus: string;

    @Expose()
    @IsArray()
    readonly recipe: ResponseRecipeDto[];
}