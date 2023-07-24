import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsString, Matches, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty()
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
            'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
    })
    password: string;


    @ApiProperty()
    @IsString()
    username: string;

    
}