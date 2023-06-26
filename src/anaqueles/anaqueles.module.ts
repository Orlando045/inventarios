import { Module } from '@nestjs/common';
import { AnaquelesService } from './service/anaqueles.service';
import { AnaquelesController } from './controller/anaqueles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anaquele } from './entities/anaquele.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Anaquele])],
  controllers: [AnaquelesController],
  providers: [AnaquelesService]
})
export class AnaquelesModule {}
