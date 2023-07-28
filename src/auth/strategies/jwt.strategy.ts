import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigKeys } from "src/utils/keys/configs.key";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    //private readonly _userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>(ConfigKeys.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      relations: ['profiles'],
      where: { id: id },
    });
    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
    if (user.deleted) {
      throw new UnauthorizedException('User is deleted, talk with an admin');
    }

    this.logger.debug('User: ' + JSON.stringify(user));
    return user;
  }
}


