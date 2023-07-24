import { PartialType } from '@nestjs/swagger';
import { CreateRegisterOutputDto } from './create-register_output.dto';
import { IsArray, IsString, IsUUID,  } from 'class-validator';

export class UpdateRegisterOutputDto extends PartialType(CreateRegisterOutputDto) {
    // @IsString()
    // @IsUUID()
    // @IsArray()
    // rawMaterialId?: string[];
}
