import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecepcioneDto } from '../dto/create-recepcione.dto';
import { UpdateRecepcioneDto } from '../dto/update-recepcione.dto';
import { Recepciones } from '../entities/recepciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrarPartidasService } from 'src/registrar-partidas/service/registrar-partidas.service';
import { RegistrarPartida } from 'src/registrar-partidas/entities/registrar-partida.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseRecepcioneDto } from '../dto/response-recepcione.dto';

@Injectable()
export class RecepcionesService {
  private readonly logger = new Logger('RecepcionesService');

  constructor(
    @InjectRepository(Recepciones)
    private readonly _recepcionesRepository: Repository<Recepciones>,
    private readonly _registarPartidaRepository: RegistrarPartidasService,
  ) {}

  async create(createRecepcioneDto: CreateRecepcioneDto) {
    const newRecepcion =
      this._recepcionesRepository.create(createRecepcioneDto);
    let recepcion: Recepciones;

    const list: RegistrarPartida[] = [];
    for (const registroPartida of createRecepcioneDto.registarPartida) {
      const temp = await this._registarPartidaRepository.create(registroPartida);
      console.log(JSON.stringify(temp));
      list.push(plainToInstance(RegistrarPartida, temp));
    }
    try {
      newRecepcion.registarPartida = list;
      recepcion = await this._recepcionesRepository.save(newRecepcion);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor contacte al administrador',
      );
    }
    return plainToInstance(ResponseRecepcioneDto, recepcion);
  }

  findAll() {
    const recepciones = this._recepcionesRepository.find({
      relations: ['registarPartida'],
    });
    return plainToInstance(ResponseRecepcioneDto, recepciones);
  }

  findOne(id: string) {
    const recepciones = this._recepcionesRepository.findOne({
      where: { id: id },
      relations: ['registarPartida'],
    });
    if (!recepciones) {
      throw new NotFoundException('registro de partida no encontrado');
    }
    return plainToInstance(ResponseRecepcioneDto, recepciones);
  }

  update(id: number, updateRecepcioneDto: UpdateRecepcioneDto) {
    return `This action updates a #${id} recepcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} recepcione`;
  }
}
