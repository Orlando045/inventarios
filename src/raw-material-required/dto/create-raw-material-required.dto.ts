import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsUUID } from "class-validator";


export class CreateRawMaterialRequiredDto {
    @IsNumber()
    @ApiProperty()
    @Type( () => Number)
    amount: number;

    @IsNumber()
    @ApiProperty()
    @Type( () => Number)
    scannedQuantity: number;
    
    @IsArray()
    @ApiProperty()
    @IsUUID('all', {each:true})
    inventoriesId: string[]

    @IsArray()
    @ApiProperty()
    @IsUUID('all', {each:true})
    rawId: string[];


   

}
