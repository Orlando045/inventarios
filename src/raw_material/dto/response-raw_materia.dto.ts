import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CommonEntity } from 'src/common/common.entity';

@Exclude()
export class ResponseRawMaterialDto extends CommonEntity {
  
  @Expose()
  @ApiProperty()
  name: string;
  @Expose()
  @ApiProperty()
  scaneId: string;
  @Expose()
  @ApiProperty()
  description: string;


}
