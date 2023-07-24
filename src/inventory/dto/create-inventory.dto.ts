import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { type } from "os";
import { setTimeZone } from "src/utils/utils.functions";

export class CreateInventoryDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  @Transform(setTimeZone, { toClassOnly: true })
  dateOfExpiry: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amount: number;

  @IsArray()
  @IsUUID('all', { each: true })
  @ApiProperty()
  rawMaterialId: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  @ApiProperty()
  warehId: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  @ApiProperty()
  shelfId: string[];


}
