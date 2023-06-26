import { Module } from '@nestjs/common';
import { InventarioService } from './service/inventario.service';
import { InventarioController } from './controller/inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { MateriasPrimasModule } from 'src/materias-primas/materias-primas.module';
import { RecepcionesService } from 'src/recepciones/service/recepciones.service';
import { RecepcionesModule } from 'src/recepciones/recepciones.module';
import { AlmacenesModule } from 'src/almacenes/almacenes.module';


@Module({
  imports:[TypeOrmModule.forFeature([Inventario]), MateriasPrimasModule, RecepcionesModule, AlmacenesModule],
  controllers: [InventarioController],
  providers: [InventarioService],
  
})
export class InventarioModule {}
