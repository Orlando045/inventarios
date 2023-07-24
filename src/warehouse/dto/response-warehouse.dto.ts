import { Exclude, Expose } from "class-transformer";
import { IsArray, IsString, IsUUID } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";

@Exclude()
export class ResponseWarehouseDto extends CommonResponseDto {
   @Expose()
   @IsString()
   readonly name: string;

    @Expose()
    @IsString()
    readonly description: string;
    
    @Expose()
    @IsArray()
    @IsUUID('all', { each: true })
    readonly shelves: string[];
}