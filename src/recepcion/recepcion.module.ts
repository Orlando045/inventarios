import { Module } from '@nestjs/common';
import { RecepcionService } from './service/recepcion.service';
import { RecepcionController } from './controller/recepcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recepcion } from './entities/recepcion.entity';
import { RegisterOutput } from 'src/register_outputs/entities/register_output.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recepcion, RegisterOutput])],
  controllers: [RecepcionController],
  providers: [RecepcionService],
  // exports: [TypeOrmModule.forFeature([RecepcionService])]
})
export class RecepcionModule { }
