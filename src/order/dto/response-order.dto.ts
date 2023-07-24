import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsString, IsUUID } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseProducrtsDto } from "src/products/dto/response-products.dto";
@Exclude()
export class ResponseOrderDto extends CommonResponseDto{
    @IsString()
    @Expose()
    folio: string;
    @Type(() => Number)
    @IsNumber()
    @Expose()
    amount: number;
    @Expose()
    product: ResponseProducrtsDto[];
}