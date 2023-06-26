import { Module } from '@nestjs/common';
import { RecepcionesService } from './service/recepciones.service';
import { RecepcionesController } from './controller/recepciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recepciones } from './entities/recepciones.entity';
import { RegistrarPartidasModule } from 'src/registrar-partidas/registrar-partidas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recepciones]), RegistrarPartidasModule],
  controllers: [RecepcionesController],
  providers: [RecepcionesService],
  exports: [TypeOrmModule.forFeature([RecepcionesService])]
})
export class RecepcionesModule {}
