import { Module } from '@nestjs/common';
import { RegistrarPartidasService } from './service/registrar-partidas.service';
import { RegistrarPartidasController } from './controller/registrar-partidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrarPartida } from './entities/registrar-partida.entity';
import { MateriasPrima } from 'src/materias-primas/entities/materias-prima.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrarPartida, MateriasPrima])],
  controllers: [RegistrarPartidasController],
  providers: [RegistrarPartidasService],
  exports: [TypeOrmModule, RegistrarPartidasService],
})
export class RegistrarPartidasModule {}
