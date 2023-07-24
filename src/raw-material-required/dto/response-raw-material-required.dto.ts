import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNumber } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseInventoryDto } from "src/inventory/dto/response-inventory.dto";

@Exclude()
export class ResponseRawMaterialRequiredDto extends CommonResponseDto {
    @Expose()
    @IsArray()
    inventories: ResponseInventoryDto[]

    @IsArray()
    @Expose()
    raw: string[];

    @IsNumber()
    @Expose()
    @Type( () => Number)
    amount: number;

    @IsNumber()
    @Expose()
    @Type( () => Number)
    scannedQuantity: number;
}