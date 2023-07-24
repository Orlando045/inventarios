import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean} from "class-validator";

export abstract class UpdateStatusDto {
    @Expose()
    @ApiProperty()
    @IsBoolean()
    status: boolean
}