import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateScannedOrderDto } from '../dto/create-scanned-order.dto';
import { UpdateScannedOrderDto } from '../dto/update-scanned-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScannedOrder } from '../entities/scanned-order.entity';
import { Repository } from 'typeorm';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseScannedOrderDto } from '../dto/response-scanned-order.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ScannedOrderService {
  private readonly logger = new Logger('ScannedOrderService');

  constructor(
    @InjectRepository(ScannedOrder)
    private readonly _scannedOrderRepository: Repository<ScannedOrder>,
    @InjectRepository(RawMaterial)
    private readonly _rawMaterialRepository: Repository<RawMaterial>,
  ) { }

  async create(createScannedOrderDto: CreateScannedOrderDto) {
    const newscanned = await this._scannedOrderRepository.create(createScannedOrderDto);
    let scannedOrder: ScannedOrder

    const list: RawMaterial[] = [];
    for (const id of createScannedOrderDto.materId) {
      const temp = await this._rawMaterialRepository.findOneBy({ id: id })
      if (!temp) {
        this.logger.log('materia prima no encontrada')
      }
      console.log(JSON.stringify(temp))
      list.push(temp);
    } newscanned.mater = list;
    try {
      scannedOrder = await this._scannedOrderRepository.save(newscanned);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(
        'Error interno del servidor contacte al administrador',
      );
    }
    return plainToInstance(ResponseScannedOrderDto, scannedOrder)
  }
  findAll() {
    return this._scannedOrderRepository.find({ where: { deleted: false } })
  }

  async findOne(id: string) {
    const scanned = await this._scannedOrderRepository.findOne({ where: { id: id } })
    if (!isUUID(id)) {
      throw new Error('no se encontró registro')
    }
    if (isUUID(id)) {
      return plainToInstance(ResponseScannedOrderDto, scanned)
    }
  }

  async update(id: string, updateScannedOrderDto: UpdateScannedOrderDto) {
    const updateScanned: ScannedOrder = await this._scannedOrderRepository.findOne(
      { where: { id: id }, relations: ['mater'] })
    if (!updateScanned) {
      throw new Error('no se encontró registro')
    }
    Object.assign(updateScanned, updateScannedOrderDto)
    if (updateScannedOrderDto.materId) {
      const mater = await this._rawMaterialRepository.createQueryBuilder('mater')
        .whereInIds(updateScannedOrderDto.materId)
        .getMany()
      updateScanned.mater = mater;
    }
    try {
      await this._scannedOrderRepository.save(updateScanned)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('ocurrio un error interno, contacte al administrador')
    }
    return plainToInstance(ResponseScannedOrderDto, updateScanned)
  }

  async remove(id: string) {
    const scanned = await this._scannedOrderRepository.findOne({where: {id: id}});
    scanned.deleted = true;
    const result = this._scannedOrderRepository.save(scanned);
    console.log(JSON.stringify(result));
    return {
      msj: 'Registro Eliminado',
      status: true
    }
  }
}
