import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigKeys } from 'src/utils/keys/configs.key';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          'JWT SECRET: ' + configService.get<string>(ConfigKeys.JWT_SECRET),
        );
        return {
          secret: configService.get<string>(ConfigKeys.JWT_SECRET),
          signOptions: {
            expiresIn: '24h',
          },
        };
      },
    }),
    //forwardRef(() => UsersModule),
    ConfigModule,
  ],
  exports: [AuthService, JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
// console.log('JWT Secret', configService.get('JWT_SECRET'))
        // console.log('JWT SECRET', process.env.JWT_SECRET);

// JwtModule.register({
    //   secret:process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '2hours',
    //   }
    // })