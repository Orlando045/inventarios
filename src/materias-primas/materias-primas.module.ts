import { Module } from '@nestjs/common';
import { MateriasPrimasService } from './service/materias-primas.service';
import { MateriasPrimasController } from './controller/materias-primas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriasPrima } from './entities/materias-prima.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MateriasPrima])],
  controllers: [MateriasPrimasController],
  providers: [MateriasPrimasService],
  exports: [TypeOrmModule, MateriasPrimasService],
})
export class MateriasPrimasModule {}
