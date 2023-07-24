import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsString, isString } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseRawMaterialDto } from "src/raw_material/dto/response-raw_materia.dto";
import { responseShelfDto } from "src/shelf/dto/response-shelf.dto";
import { ResponseWarehouseDto } from "src/warehouse/dto/response-warehouse.dto";

@Exclude()
export class ResponseInventoryDto extends CommonResponseDto {
    @Expose()
    @IsString()
    readonly description: string;

    @Expose()
    readonly dateOfExpiry: string;

    @Type(() => Number)
    @IsNumber()
    @Expose()
    amount: number;

    @IsString()
    @Expose()
    idpackage: string;

    @Expose()
    @IsArray()
    readonly rawMaterial_: ResponseRawMaterialDto[]

    @Expose()
    @IsArray()
    readonly wareh: ResponseWarehouseDto[];

    @Expose()
    @IsArray()
    readonly shelf: responseShelfDto[];
}