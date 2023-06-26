import { CommonResponseDto } from 'src/common/common.response.dto';
import { ResponseMateriaPrimaDto } from 'src/materias-primas/dto/response-materia-prima.dto';

export class ResponseRegistarPartidaDto extends CommonResponseDto {
  materiasPrima: ResponseMateriaPrimaDto[];
  cantidad: number;
  //recepcion: Recepciones;
}
