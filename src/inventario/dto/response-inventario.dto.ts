import { CommonResponseDto } from "src/common/common.response.dto";
import { ResponseMateriaPrimaDto } from "src/materias-primas/dto/response-materia-prima.dto";
import { MateriasPrima } from "src/materias-primas/entities/materias-prima.entity";
import { ResponseRecepcioneDto } from "src/recepciones/dto/response-recepcione.dto";

export class ResponseInventarioDto extends CommonResponseDto {
    description: string;
    recepcioneId: ResponseRecepcioneDto[];
    almaceneId: ResponseRecepcioneDto[];
}