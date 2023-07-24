import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";

@Exclude()
export class ResponseScannedOrderDto extends CommonResponseDto {
    @IsNumber()
    @IsOptional()
    @Expose()
    @Type(() => Number)
    readonly amountPackage: number;

    @IsArray()
    @IsString()
    @Expose()
    @IsUUID('all', { each: true })
    readonly mater: string[];
}