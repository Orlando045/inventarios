import { Matches } from "class-validator";


export class updateStatusOrderDto {
    @Matches(/^(Porhacer|Enproceso|Finalizado)$/)
    order: string;
}