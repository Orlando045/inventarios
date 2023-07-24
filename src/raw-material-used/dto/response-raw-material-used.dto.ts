import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { CommonEntity } from "src/common/common.entity";

@Exclude()
export class ResponseRawMaterialUsedDto extends CommonEntity {

    @Expose()
    @IsString()
    readonly folio: string;

    @IsNumber()
    @Type(() => Number)
    @Expose()
    readonly amount: number;
    
    @Expose()
    readonly idpackage: string;

    @Expose()
    @IsArray()
    readonly rawM: string[];
}