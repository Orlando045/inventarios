import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';
import { CommonResponseDto } from 'src/common/common.response.dto';
import { CreateRegisterOutputDto } from 'src/register_outputs/dto/create-register_output.dto';
import { ResponseRegiterOutputDto } from 'src/register_outputs/dto/reponse-register_Output.dto';

@Exclude()
export class ResponseRecepcionDto extends CommonResponseDto {
  @Expose()
  @IsString()
  readonly folio: string;
  @Expose()
  readonly orderStatus: string;
  @Expose()
  @IsDate()
  readonly arrivalDate: Date;
  @Expose()
  @IsArray()
  readonly registerOut: ResponseRegiterOutputDto[];
}