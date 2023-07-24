import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseProducrtsDto } from "src/products/dto/response-products.dto";

@Exclude()
export class ResponseManufactureOrderDto extends CommonResponseDto {

    @IsNumber()
    @Type(() => Number)
    @Expose()
    readonly amount: number;

    @IsString()
    @Expose()
    readonly idpackage: string;
    
    @Expose()
    readonly orderStatus: string;

    @Expose()
    @IsArray()
    readonly products: ResponseProducrtsDto[];
}