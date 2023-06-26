import { PartialType } from '@nestjs/swagger';
import { CreateAnaqueleDto } from './create-anaquele.dto';

export class UpdateAnaqueleDto extends PartialType(CreateAnaqueleDto) {}
