import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateRawMaterialDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    scaneId: string;

    @IsString()
    @ApiProperty()
    description: string;
   
}

