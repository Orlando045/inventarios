import { Module } from '@nestjs/common';
import { ProfilesService } from './services/profile.service';
import { ProfilesController } from './controller/profile.controller';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), AuthModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],

})
export class ProfileModule {}
