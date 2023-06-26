import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRegistrarPartidaDto } from '../dto/create-registrar-partida.dto';
import { UpdateRegistrarPartidaDto } from '../dto/update-registrar-partida.dto';
import { RegistrarPartida } from '../entities/registrar-partida.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseRegistarPartidaDto } from '../dto/response-registar-partida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MateriasPrima } from 'src/materias-primas/entities/materias-prima.entity';

@Injectable()
export class RegistrarPartidasService {
  private readonly logger = new Logger('RegistrarPartidasService');

  constructor(
    @InjectRepository(RegistrarPartida)
    private readonly _registrarPartida: Repository<RegistrarPartida>,
    @InjectRepository(MateriasPrima)
    private readonly _materiasPrimas: Repository<MateriasPrima>,
  ) {}

  async create(createRegistrarPartidaDto: CreateRegistrarPartidaDto) {
    const newRegistrarPartida = this._registrarPartida.create(
      createRegistrarPartidaDto,
    );
    let registrarPartida: RegistrarPartida;

    const list: MateriasPrima[] = [];
    for (const id of createRegistrarPartidaDto.materiasPrimaId) {
      const temp = await this._materiasPrimas.findOneBy({ id: id });
      if (!temp) {
        //throw new NotFoundException('materia prima no encontrada');
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    try {
      newRegistrarPartida.materiasPrima = list;
      registrarPartida = await this._registrarPartida.save(newRegistrarPartida);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor contacte al administrador',
      );
    }
    return plainToInstance(ResponseRegistarPartidaDto, registrarPartida);
  }

  findAll() {
    const registarPartidaList = this._registrarPartida.find({
      relations: ['materiasPrima'],
    });
    return plainToInstance(ResponseRegistarPartidaDto, registarPartidaList);
  }

  findOne(id: string) {
    const registarPartida = this._registrarPartida.findOne({
      where: { id: id },
      relations: ['materiasPrima'],
    });
    if (!registarPartida) {
      throw new NotFoundException('registro de partida no encontrado');
    }
    return plainToInstance(ResponseRegistarPartidaDto, registarPartida);
  }

  update(id: number, updateRegistrarPartidaDto: UpdateRegistrarPartidaDto) {
    return `This action updates a #${id} registrarPartida`;
  }

  remove(id: number) {
    return `This action removes a #${id} registrarPartida`;
  }
}
