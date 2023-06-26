import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MateriasPrimasService } from '../service/materias-primas.service';
import { CreateMateriasPrimaDto } from '../dto/create-materias-prima.dto';
import { UpdateMateriasPrimaDto } from '../dto/update-materias-prima.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('materias-primas')
@ApiTags('Materias Primas')
export class MateriasPrimasController {
  constructor(private readonly materiasPrimasService: MateriasPrimasService) {}

  @Post()
  create(@Body() createMateriasPrimaDto: CreateMateriasPrimaDto) {
    return this.materiasPrimasService.create(createMateriasPrimaDto);
  }

  @Get()
  findAll() {
    return this.materiasPrimasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiasPrimasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMateriasPrimaDto: UpdateMateriasPrimaDto,
  ) {
    return this.materiasPrimasService.update(id, updateMateriasPrimaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiasPrimasService.remove(id);
  }
}
