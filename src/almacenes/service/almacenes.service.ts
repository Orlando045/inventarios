import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAlmaceneDto } from '../dto/create-almacene.dto';
import { UpdateAlmaceneDto } from '../dto/update-almacene.dto';
import { Almacene } from '../entities/almacene.entity';
import { Repository } from 'typeorm';
import { Anaquele } from 'src/anaqueles/entities/anaquele.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseRegistarPartidaDto } from 'src/registrar-partidas/dto/response-registar-partida.dto';
import { plainToInstance } from 'class-transformer';
import { Responsealamacendto } from '../dto/response-almacen.dto';

@Injectable()
export class AlmacenesService {
  private readonly logger = new Logger('RegistrarPartidasService');

  constructor(
    @InjectRepository(Almacene)
    private readonly _AlmaceneRepostory : Repository<Almacene>,
    @InjectRepository(Anaquele)
    private readonly _AnaqueleRepository: Repository<Anaquele>,
  ) {}


  async create(CreateAlmaceneDto: CreateAlmaceneDto) {
    const newalmacen = this._AlmaceneRepostory.create(
      CreateAlmaceneDto,
    );
    let almacene: Almacene;

    const list: Anaquele[] = [];
    for (const id of CreateAlmaceneDto.anaqueleId) {
      const temp = await this._AnaqueleRepository.findOneBy({ id: id });
      if (!temp) {
        //throw new NotFoundException('materia prima no encontrada');
        this.logger.log('anaquele no encontrado');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    try {
      newalmacen.anaquele = list;
      almacene = await this._AlmaceneRepostory.save(newalmacen);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor contacte al administrador',
      );
    }
    return plainToInstance(ResponseRegistarPartidaDto, almacene);
  }

  findAll() {
    const almacenelist = this._AlmaceneRepostory.find()
    return plainToInstance(Responsealamacendto, almacenelist);
  }

  findOne(id: string) {
    const almacene = this._AlmaceneRepostory.findOne({
      where: { id: id },
      relations: ['anaquele'],
    });
    if (!almacene) {
      throw new NotFoundException('registro de partida no encontrado');
    }
    return plainToInstance(Responsealamacendto, almacene);
  }

  update(id: number, updateAlmaceneDto: UpdateAlmaceneDto) {
    return `This action updates a #${id} almacene`;
  }

  remove(id: number) {
    return `This action removes a #${id} almacene`;
  }
}
