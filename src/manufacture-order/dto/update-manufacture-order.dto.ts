import { PartialType } from '@nestjs/swagger';
import { CreateManufactureOrderDto } from './create-manufacture-order.dto';

export class UpdateManufactureOrderDto extends PartialType(CreateManufactureOrderDto) {}
