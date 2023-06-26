import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { MateriasPrimasModule } from './materias-primas/materias-primas.module';
import { RegistrarPartidasModule } from './registrar-partidas/registrar-partidas.module';
import { RecepcionesModule } from './recepciones/recepciones.module';
import { AnaquelesModule } from './anaqueles/anaqueles.module';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { InventarioModule } from './inventario/inventario.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    MateriasPrimasModule,
    RegistrarPartidasModule,
    RecepcionesModule,
    AnaquelesModule,
    AlmacenesModule,
    InventarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
