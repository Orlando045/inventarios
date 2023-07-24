import { PartialType } from '@nestjs/swagger';
import { CreateLoteOfProductDto } from './create-lote-of-product.dto';

export class UpdateLoteOfProductDto extends PartialType(CreateLoteOfProductDto) {}
