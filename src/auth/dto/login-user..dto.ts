import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(32)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'La contraseña debe tener una letra mayúscula, minúscula y un número',
    })
    password: string;


}