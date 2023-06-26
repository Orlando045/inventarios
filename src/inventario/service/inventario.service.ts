import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateInventarioDto } from '../dto/create-inventario.dto';
import { UpdateInventarioDto } from '../dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from '../entities/inventario.entity';
import { Any, Repository } from 'typeorm';
import { MateriasPrima } from 'src/materias-primas/entities/materias-prima.entity';
import { ResponseInventarioDto } from '../dto/response-inventario.dto';
import { plainToInstance } from 'class-transformer';
import { RegistrarPartida } from 'src/registrar-partidas/entities/registrar-partida.entity';
import { Recepciones } from 'src/recepciones/entities/recepciones.entity';
import { Almacene } from 'src/almacenes/entities/almacene.entity';

@Injectable()
export class InventarioService {

  private readonly logger = new Logger('InventarioService');

  constructor(
    @InjectRepository(Inventario)
    private  readonly _InvetarioRepository: Repository<Inventario>,
    @InjectRepository(Recepciones)
    private  readonly _RecepcionesRepository: Repository<Recepciones>,
    @InjectRepository(Almacene)
    private  readonly _AlmacenesRepository: Repository<Almacene>,

  ){}

  async create(CreateInventarioDto: CreateInventarioDto) {
    const newInvetario = this._InvetarioRepository.create(
      CreateInventarioDto,
    );
    let inventario: Inventario;

    const list: Recepciones[] = [];
    for (const id of CreateInventarioDto.recepcioneId) {
      const temp = await this._RecepcionesRepository.findOneBy({ id: id });
      if (!temp) {
        //throw new NotFoundException('materia prima no encontrada');
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    try {
      newInvetario.recepcione = list;
      inventario = await this._InvetarioRepository.save(newInvetario);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor contacte al administrador',
      );
    }
    
    return plainToInstance(ResponseInventarioDto, inventario);
  }

  async findAll() {
    // const registarinventario = this._InvetarioRepository.find();
    // return plainToInstance(ResponseInventarioDto, registarinventario);
   const query = this._InvetarioRepository.createQueryBuilder('inventario')
   .leftJoinAndSelect('inventario.recepcione', 'recepcione' )
   .leftJoinAndSelect('inventario.recepcione', 'almacen' )
    
   const registarinventario = await query.getMany();
   return plainToInstance(ResponseInventarioDto, registarinventario);

  }

  findOne(id: string) {
    const inventario = this._InvetarioRepository.findOne({
      where: { id: id },
      relations: ['materiaprima'],
    });
    if (!inventario) {
      throw new NotFoundException('registro de partida no encontrado');
    }
    return plainToInstance(ResponseInventarioDto, inventario);
  }

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return `This action updates a #${id} inventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventario`;
  }
}
