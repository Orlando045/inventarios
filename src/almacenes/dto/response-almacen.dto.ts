import { responseAnaqueledto } from "src/anaqueles/dto/response-anaquele.dto";
import { CommonResponseDto } from "src/common/common.response.dto";

export class Responsealamacendto extends CommonResponseDto {
    materiasPrima: responseAnaqueledto[];
    cantidad: number;
    //recepcion: Recepciones;
  }
  