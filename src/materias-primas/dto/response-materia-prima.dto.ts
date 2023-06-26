import { CommonResponseDto } from 'src/common/common.response.dto';
import { ResponseInventarioDto } from 'src/inventario/dto/response-inventario.dto';
import { ResponseRegistarPartidaDto } from 'src/registrar-partidas/dto/response-registar-partida.dto';

export class ResponseMateriaPrimaDto extends CommonResponseDto {
  nombre: string;
  idScaneo: string;
  descripcion: string;
  registarPartida: ResponseRegistarPartidaDto[];
 
}
