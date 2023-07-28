import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { LoginUserDto } from 'src/auth/dto/login-user..dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    //private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, username } = loginUserDto;
    const user = await this._userRepository.findOne({
      where: { username },
      select: { username: true, password: true, id: true },
    });

    //console.log("User: "+JSON.stringify(user))
    if (!user) {
      throw new UnauthorizedException(
        'Please check your credentials, password or incorrect username',
      );
    }

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        'Please check your credentials, password or incorrect email',
      );

    delete user.password;
    return {
      ...user,
      token: this.generateJwtToken({ id: user.id,  }),
    };
  }

  async refreshToken(user: User) {
    //TODO: return jwt token
    delete user.password;
    return {
      ...user,
      token: this.generateJwtToken({ id: user.id, }),
    };
  }

  private generateJwtToken(payload: JwtPayload) {
    const token = this._jwtService.sign(payload);
    return token;
  }
}
