import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
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
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;

    @ApiProperty()
    @IsOptional()
    profilesId: string[];
}




