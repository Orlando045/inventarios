import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsString, Matches, MinLength } from "class-validator";
import { CommonResponseDto } from "src/common/common.response.dto";
import { Profile } from "src/profile/entities/profile.entity";


export class ResponseUserDto extends CommonResponseDto {
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    password: string;
  
    @ApiProperty()
    profiles: Profile[];
  }