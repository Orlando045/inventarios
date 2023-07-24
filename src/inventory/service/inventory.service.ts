import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../entities/inventory.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';
// import { ResponseInventarioDto } from 'src/inventario/dto/response-inventario.dto';
import { plainToInstance } from 'class-transformer';
import { WarehouseService } from 'src/warehouse/service/warehouse.service';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { IsUUID, isUUID } from 'class-validator';
import { ResponseInventoryDto } from '../dto/response-inventory.dto';
import { UpdateStatusDto } from 'src/common/update-status.dto';
import { Shelf } from 'src/shelf/entities/shelf.entity';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger('InventoryService');

  constructor(
    @InjectRepository(Inventory)
    private readonly _inventoryRepository: Repository<Inventory>,
    @InjectRepository(RawMaterial)
    private readonly _rawMaterialRepository: Repository<RawMaterial>,
    @InjectRepository(Warehouse)
    private readonly _wareHouseRepository: Repository<Warehouse>,
    @InjectRepository(Shelf)
    private readonly _shelfRepository: Repository<Shelf>,
  ) { }

  async create(createInventoryDto: CreateInventoryDto) {
    const newInventory = this._inventoryRepository.create(createInventoryDto);
    let inventory: Inventory;

    let listRawMaterial: RawMaterial[] = [];
    for (const id of createInventoryDto.rawMaterialId) {
      const temp = await this._rawMaterialRepository.findOneBy({ id: id });
      if (!temp) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(temp));
      listRawMaterial.push(temp);
    }
    newInventory.rawMaterial_ = listRawMaterial;


    let listware: Warehouse[] = [];
    for (const id of createInventoryDto.warehId) {
      const warehouse = await this._wareHouseRepository.findOneBy({ id: id });
      if (!warehouse) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(warehouse));
      listware.push(warehouse);
    }
    newInventory.wareh = listware;
    console.log(Warehouse)

    let listShelf: Shelf[] = [];
    for (const id of createInventoryDto.shelfId) {
      const shelf = await this._shelfRepository.findOneBy({ id: id });
      if (!shelf) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(shelf));
      listShelf.push(shelf);
    }
    newInventory.shelf = listShelf;
    console.log(Shelf)

    try {
      inventory = await this._inventoryRepository.save(newInventory);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
    }
    return plainToInstance(ResponseInventoryDto, inventory);
  }

  findAll() {
    return this._inventoryRepository.find({where: {deleted: false}})
  }

  findOne(id: string) {
    const inventory = this._inventoryRepository.findOne({ where: { id: id } })
    if (!isUUID(id)) {
      throw new Error('no se econtró registro')
    }
    if (isUUID(id)) {
      return plainToInstance(ResponseInventoryDto, inventory)
    }
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    console.log(id)
    const updateInventory: Inventory = await this._inventoryRepository.findOne({ where: { id: id }, relations: ['rawMaterial_', 'shelf', 'wareh'] })
    if (!updateInventory) {
      throw new Error('Este producto no existe');
    }

    Object.assign(updateInventory, updateInventoryDto);

    if (updateInventoryDto.rawMaterialId) {
      const raw_materia = await this._rawMaterialRepository.createQueryBuilder('rawMaterial')
        .whereInIds(updateInventoryDto.rawMaterialId)
        .getMany();

      updateInventory.rawMaterial_ = raw_materia;
    }
    if (updateInventoryDto.shelfId) {
      const shelf = await this._shelfRepository.createQueryBuilder('shelf')
        .whereInIds(updateInventoryDto.shelfId)
        .getMany();

      updateInventory.shelf = shelf;
    }
    if (updateInventoryDto.warehId) {
      const wareh = await this._wareHouseRepository.createQueryBuilder('rawMaterial')
        .whereInIds(updateInventoryDto.warehId)
        .getMany();

      updateInventory.wareh = wareh;
    }

    try {
      await this._inventoryRepository.save(updateInventory);

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseInventoryDto, updateInventory);

  }

  async remove(id: string) {
    const inventory = await this._inventoryRepository.findOne({ where: { id: id } });
    inventory.deleted = true
    const result = this._inventoryRepository.save(inventory)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }

  async updateState(id: string, stateDto: UpdateStatusDto): Promise<Inventory> {
    const inventory = await this._inventoryRepository.findOne({ where: { id: id } });
    inventory.status = stateDto.status;
    return await this._inventoryRepository.save(inventory);
  }

  async countMateriasPrimas(id: string): Promise<{ materiasPrimas: number, shelf: number, warehouses: number }> {
    const inventario = await this._inventoryRepository.findOne({ where: { id }, relations: ['rawMaterial_', 'wareh', 'shelf'] });
    return {
      materiasPrimas: inventario.rawMaterial_.length,
      shelf: inventario.shelf.length,
      warehouses: inventario.wareh.length,
    };
  }
}
