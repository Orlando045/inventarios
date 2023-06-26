import { CommonResponseDto } from 'src/common/common.response.dto';
import { ResponseInventarioDto } from 'src/inventario/dto/response-inventario.dto';
import { ResponseRegistarPartidaDto } from 'src/registrar-partidas/dto/response-registar-partida.dto';

export class ResponseRecepcioneDto extends CommonResponseDto {
  folio: string;
  estadoDelPedido: boolean;
  fechaDeLlegada: Date;
  registarPartida: ResponseRegistarPartidaDto[];

}
