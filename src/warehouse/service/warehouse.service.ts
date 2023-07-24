import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from '../entities/warehouse.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Shelf } from 'src/shelf/entities/shelf.entity';
import { isUUID } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateStatusDto } from 'src/common/update-status.dto';
import { ResponseWarehouseDto } from '../dto/response-warehouse.dto';

@Injectable()
export class WarehouseService {
  private readonly logger = new Logger('warehouseService')


  constructor(
    @InjectRepository(Warehouse)
    private readonly _warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Shelf)
    private readonly _shelfRepository: Repository<Shelf>,
  ) { }

  async create(createWarehouseDto: CreateWarehouseDto) {
    const newWareehouse = this._warehouseRepository.create(createWarehouseDto)
    let warehouse: Warehouse;

    let listShelf: Shelf[] = []
    for (const id of createWarehouseDto.shelfId) {
      const temp = await this._shelfRepository.findOneBy({ id: id });
      if (!temp) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(temp));
      listShelf.push(temp);

    }

    try {

      newWareehouse.shelves = listShelf;
      this.logger.log(JSON.stringify(newWareehouse));
      warehouse = await this._warehouseRepository.save(newWareehouse);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
    }
    return plainToInstance(ResponseWarehouseDto, warehouse);
  }

  findAll() {
    return this._warehouseRepository.find({where: { deleted: false}});
  }

  async findOne(id: string) {
    const warehouse = await this._warehouseRepository.findOne({ where: { id: id, deleted: false } })
    if (!isUUID(id)) {
      throw new BadRequestException('invalid id')
    }
    return warehouse;
  }
  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    const updatewareh = await this._warehouseRepository.findOne({ where: { id, deleted: false }, relations: ['shelves'] });

    if (!updatewareh) {
      throw new Error('Este producto no existe');
    }

    Object.assign(updatewareh, updateWarehouseDto);

    if (updateWarehouseDto.shelfId) {
      const shelf = await this._shelfRepository.createQueryBuilder('rawMaterial')
        .whereInIds(updateWarehouseDto.shelfId)
        .getMany();

      updatewareh.shelves = shelf;
    }
    try {
      await this._warehouseRepository.save(updatewareh);

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseWarehouseDto, updatewareh);
  }


  async remove(id: string) {
    const warehouse = await this._warehouseRepository.findOne({ where: { id: id } });
    warehouse.deleted = true
    const result = this._warehouseRepository.save(warehouse)
    console.log('delet' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }
  async updateState(id: string, stateDto: UpdateStatusDto): Promise<Warehouse> {
    const rawMaterial = await this._warehouseRepository.findOne({ where: { id: id } });
    rawMaterial.status = stateDto.status;
    return await this._warehouseRepository.save(rawMaterial);
  }
}
