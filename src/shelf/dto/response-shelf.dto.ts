import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";

@Exclude()
export  class responseShelfDto extends CommonResponseDto{
    @Expose()
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly description: string;
}