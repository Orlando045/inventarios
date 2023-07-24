import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { CommonEntity } from "src/common/common.entity"

export class CreateShelfDto extends CommonEntity {

    @IsString()   
    @ApiProperty()
    name: string

    @IsString()   
    @ApiProperty()
    description: string
}
