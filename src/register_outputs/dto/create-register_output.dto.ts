import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsUUID } from "class-validator";
export class CreateRegisterOutputDto  {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  amount: number;
  @IsArray()
  @IsUUID('all', {each: true})
  @ApiProperty()
  rawMaterialId: string[];

 
}
