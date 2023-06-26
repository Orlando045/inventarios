import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateAnaqueleDto {
    @IsString()   
    @ApiProperty()
    nombre : string
    @IsString()   
    @ApiProperty()
    description : string
}
