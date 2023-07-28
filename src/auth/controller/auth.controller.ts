import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/entities/user.entity';
import { Auth } from '../decorators/auth.decorators';
import { GetUser } from '../decorators/get-user.decorator';
import { LoginUserDto } from 'src/auth/dto/login-user..dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/refresh-token')
  @Auth()
  refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }
}
