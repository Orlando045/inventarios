import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePerfilDto {

    @ApiProperty()
    @IsString()
    admin: string;

    @ApiProperty()
    @IsString()
    receptionist: string;

    @ApiProperty()
    @IsString()
    storer: string;
}
