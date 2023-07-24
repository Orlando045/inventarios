import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateRawMaterialUsedDto } from '../dto/create-raw-material-used.dto';
import { UpdateRawMaterialUsedDto } from '../dto/update-raw-material-used.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RawMaterialUsed } from '../entities/raw-material-used.entity';
import { Repository } from 'typeorm';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';
import { ResponseRawMaterialUsedDto } from '../dto/response-raw-material-used.dto';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';

@Injectable()
export class RawMaterialUsedService {
  private readonly logger = new Logger('RawMaterialUsedService');

  constructor(
    @InjectRepository(RawMaterialUsed)
    private readonly _rawMaterialUsedRepository: Repository<RawMaterialUsed>,
    @InjectRepository(RawMaterial)
    private readonly _rawMaterialRepository: Repository<RawMaterial>
  ) { }
  async create(createRawMaterialUsedDto: CreateRawMaterialUsedDto) {
    const newRawMaterialUsed = await this._rawMaterialUsedRepository.create(createRawMaterialUsedDto)
    let rawMaterialUsed: RawMaterialUsed

    let list: RawMaterial[] = [];
    for (const id of createRawMaterialUsedDto.rawMId) {
      const temp = await this._rawMaterialRepository.findOneBy({id: id})
      if(!temp) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    newRawMaterialUsed.rawM = list;
    try {
      rawMaterialUsed = await this._rawMaterialUsedRepository.save(newRawMaterialUsed)
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
    }
    return plainToInstance(ResponseRawMaterialUsedDto, rawMaterialUsed);
  }
  findAll() {
    return this._rawMaterialUsedRepository.find({where: {deleted: false}});
  }

  async findOne(id: string) {
    const used = await this._rawMaterialUsedRepository.findOne({where: {id: id}})
    if(!isUUID(id)){
      throw new Error('no se encontró registro')
    }
    if(isUUID(id)){
      return plainToInstance(ResponseRawMaterialUsedDto, used);
  }
  }
  async update(id: string, updateRawMaterialUsedDto: UpdateRawMaterialUsedDto) {
    const updateused = await this._rawMaterialUsedRepository.findOne({where: {id: id}, relations: ['rawM']})
    if(!updateused){
      throw new Error('no se encontró registro')
    }
    Object.assign(updateused, updateRawMaterialUsedDto)
    if(updateRawMaterialUsedDto.rawMId){
      const rawMId = await this._rawMaterialRepository.createQueryBuilder('rawM')
      .whereInIds(updateRawMaterialUsedDto.rawMId)
      .getMany()
      updateused.rawM = rawMId;
  }
  try {
    await this._rawMaterialRepository.save(updateused)
  } catch (error) {
    console.log(error)
    throw new Error('no se pudo guardar el registro')
  }
  return  plainToInstance(ResponseRawMaterialUsedDto, updateused)
}
  async remove(id: string) {
    const used = await this._rawMaterialUsedRepository.findOne({where: {id: id}})
    used.deleted = true
    const result = await this._rawMaterialUsedRepository.save(used)
    console.log(JSON.stringify(result))
    return{
      msj: 'registro eliminado',
      status: true
    }
  }
}
