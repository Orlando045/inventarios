import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecepcionesService } from '../service/recepciones.service';
import { CreateRecepcioneDto } from '../dto/create-recepcione.dto';
import { UpdateRecepcioneDto } from '../dto/update-recepcione.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('recepciones')
@ApiTags('Recepciones')
export class RecepcionesController {
  constructor(private readonly recepcionesService: RecepcionesService) {}

  @Post()
  create(@Body() createRecepcioneDto: CreateRecepcioneDto) {
    return this.recepcionesService.create(createRecepcioneDto);
  }

  @Get()
  findAll() {
    return this.recepcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recepcionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecepcioneDto: UpdateRecepcioneDto,
  ) {
    return this.recepcionesService.update(+id, updateRecepcioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recepcionesService.remove(+id);
  }
}
