import { PartialType } from '@nestjs/swagger';
import { CreateScannedOrderDto } from './create-scanned-order.dto';

export class UpdateScannedOrderDto extends PartialType(CreateScannedOrderDto) {}
