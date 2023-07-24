import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseRawMaterialDto } from "src/raw_material/dto/response-raw_materia.dto";

@Exclude()
export class ResponseRegiterOutputDto extends CommonResponseDto {
  @Expose()
  readonly rawMaterial: ResponseRawMaterialDto[];
  @Type(() => Number)
  @Expose()
  @IsNumber()
  readonly mount: number;
}