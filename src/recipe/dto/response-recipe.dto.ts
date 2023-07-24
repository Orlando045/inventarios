import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseRawMaterialDto } from "src/raw_material/dto/response-raw_materia.dto";

@Exclude()
export class ResponseRecipeDto extends CommonResponseDto {
    @Type(() => Number)
    @IsNumber()
    @Expose()
    amount_to_use: number;

    @IsArray()
    @Expose()
    @IsString()
    material: ResponseRawMaterialDto[];
}