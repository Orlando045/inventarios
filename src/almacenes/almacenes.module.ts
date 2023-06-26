import { Module } from '@nestjs/common';
import { AlmacenesService } from './service/almacenes.service';
import { AlmacenesController } from './controller/almacenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Almacene } from './entities/almacene.entity';
import { Anaquele } from 'src/anaqueles/entities/anaquele.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Almacene, Anaquele])
  ],
  controllers: [AlmacenesController],
  providers: [AlmacenesService],
  exports: [TypeOrmModule.forFeature([AlmacenesService])]
})
export class AlmacenesModule {}
