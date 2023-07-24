import { Module } from '@nestjs/common';
import { RegisterOutputsService } from './services/register_outputs.service';
import { RegisterOutputsController } from './controller/register_outputs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterOutput } from './entities/register_output.entity';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterOutput, RawMaterial])],
  controllers: [RegisterOutputsController],
  providers: [RegisterOutputsService],
  exports: [TypeOrmModule, RegisterOutputsService],
})
export class RegisterOutputsModule { }
