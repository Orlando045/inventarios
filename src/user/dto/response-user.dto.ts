import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsString, Matches, MinLength } from "class-validator";

@Exclude()
export class ResponseUserDto {

    @Expose()
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
            'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
    })
    readonly password: string;

    @Expose()
    @IsString()
    readonly fullName: string;

    @Expose()
    @IsString()
    readonly username: string;

    @IsBoolean()
    @Expose()
    readonly isActive: boolean;

    @Expose()
    readonly role: string;
}