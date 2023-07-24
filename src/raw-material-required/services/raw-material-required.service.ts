import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateRawMaterialRequiredDto } from '../dto/create-raw-material-required.dto';
import { UpdateRawMaterialRequiredDto } from '../dto/update-raw-material-required.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterialRequired } from '../entities/raw-material-required.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseRawMaterialRequiredDto } from '../dto/response-raw-material-required.dto';
import { isUUID } from 'class-validator';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';

@Injectable()
export class RawMaterialRequiredService {
  private readonly logger = new Logger('RawMaterialRequiredService');

  constructor(
    @InjectRepository(RawMaterialRequired)
    private readonly _rawMaterialRequiredRepository: Repository<RawMaterialRequired>,
    @InjectRepository(Inventory)
    private readonly _inventoryRepository: Repository<Inventory>,
    @InjectRepository(RawMaterial)
    private readonly _rawMaterialRepository: Repository<RawMaterial>,
  ){}

  async create(createRawMaterialRequiredDto: CreateRawMaterialRequiredDto) {
    const newrequired = await this._rawMaterialRequiredRepository.create(createRawMaterialRequiredDto);
  let required : RawMaterialRequired;

  let list : Inventory [] = [];
  for(const id of createRawMaterialRequiredDto.inventoriesId){
    const temp = await this._inventoryRepository.findOneBy({id:id})
    if (!temp) {
      this.logger.log('materia prima no encontrada');
    }
    console.log(JSON.stringify(temp));
    list.push(temp);
  }
  let listRaw : RawMaterial[] = [];
  for(const id of createRawMaterialRequiredDto.rawId){
    const raw = await this._rawMaterialRepository.findOneBy({id:id})
    if (!raw) {
      this.logger.log('materia prima no encontrada');
    }
    console.log(JSON.stringify(raw));
    listRaw.push(raw);
  }
  
  try {
    newrequired.inventories = list;
    newrequired.raw = listRaw;
    required = await this._rawMaterialRequiredRepository.save(newrequired)
  } catch (error) {
    this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
  }
  return plainToInstance(ResponseRawMaterialRequiredDto, required)
}

  findAll() {
    return this._rawMaterialRequiredRepository.find({where: {deleted: false}})
  }

  async findOne(id: string) {
    const required = await this._rawMaterialRequiredRepository.findOne({where: {id: id}});
    if (!isUUID(id)) {
      throw new Error('no se encontró el regsitro')
  }
  if(isUUID(id)){
    return plainToInstance(ResponseRawMaterialRequiredDto, required)
  }
}

  async update(id: string, updateRawMaterialRequiredDto: UpdateRawMaterialRequiredDto) {
    console.log(id)
    const updateRequired: RawMaterialRequired = await this._rawMaterialRequiredRepository.findOne({ where: { id: id }, relations: ['inventories'] })
    if (!updateRequired) {
      throw new Error('Este producto no existe');
    }

    Object.assign(updateRequired, updateRawMaterialRequiredDto);

    if (updateRawMaterialRequiredDto.inventoriesId) {
      const inventory = await this._inventoryRepository.createQueryBuilder('inventories')
        .whereInIds(updateRawMaterialRequiredDto.inventoriesId)
        .getMany();

      updateRequired.inventories = inventory;
    }
    if (updateRawMaterialRequiredDto.rawId) {
      const raw = await this._rawMaterialRepository.createQueryBuilder('raw')
        .whereInIds(updateRawMaterialRequiredDto.rawId)
        .getMany();

      updateRequired.raw = raw;
    }
    try {
      await this._rawMaterialRequiredRepository.save(updateRequired);
      
    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseRawMaterialRequiredDto, updateRequired);
  }

  async remove(id: string) {
    const required = await this._rawMaterialRequiredRepository.findOne({ where: { id: id } });
    required.deleted = true
    const result = this._rawMaterialRequiredRepository.save(required)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }
}
