import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidProfiles } from 'src/auth/interfaces/valid-profile';
import { Auth } from 'src/auth/decorators/auth.decorators';
@Controller('user')
@ApiTags('USER')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth(ValidProfiles.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
