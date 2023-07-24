import { Exclude, Expose } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
@Exclude()
export class ResponseLoteOfProductDto extends CommonResponseDto {
    @IsString()
    @IsOptional()
    @Expose()
    readonly folio: string;

    @IsString()
    @Expose()
    readonly idLote: string

    @IsArray()
    @IsUUID('all', { each: true })
    @Expose()
    readonly produ: string[];

    @IsArray()
    @IsUUID('all', { each: true })
    @Expose()
    readonly materialR: string[];
}