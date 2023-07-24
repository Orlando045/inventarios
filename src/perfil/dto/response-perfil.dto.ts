import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class ResponsePerfilDto {

    @IsString()
    @Expose()
    readonly admin: string;


    @IsString()
    @Expose()
    readonly receptionist: string;


    @IsString()
    @Expose()
    readonly storer: string;
}