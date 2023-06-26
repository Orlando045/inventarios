import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistrarPartidasService } from '../service/registrar-partidas.service';
import { CreateRegistrarPartidaDto } from '../dto/create-registrar-partida.dto';
import { UpdateRegistrarPartidaDto } from '../dto/update-registrar-partida.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('registrar-partidas')
@ApiTags('Registrar Partidas')
export class RegistrarPartidasController {
  constructor(
    private readonly registrarPartidasService: RegistrarPartidasService,
  ) {}

  @Post()
  create(@Body() createRegistrarPartidaDto: CreateRegistrarPartidaDto) {
    return this.registrarPartidasService.create(createRegistrarPartidaDto);
  }

  @Get()
  findAll() {
    return this.registrarPartidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrarPartidasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrarPartidaDto: UpdateRegistrarPartidaDto,
  ) {
    return this.registrarPartidasService.update(+id, updateRegistrarPartidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrarPartidasService.remove(+id);
  }
}
