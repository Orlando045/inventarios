import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CommonResponseDto } from 'src/common/common.response.dto';
import { ResponseInventarioDto } from 'src/inventario/dto/response-inventario.dto';
import { ResponseRegistarPartidaDto } from 'src/registrar-partidas/dto/response-registar-partida.dto';

@Exclude()
export class ResponseMateriaPrimaDto extends CommonResponseDto {

  
  @Expose()
  @ApiProperty()
  name: string;
  @Expose()
  @ApiProperty()
  scaneId: string;
  @Expose()
  @ApiProperty()
  description: string;


}
