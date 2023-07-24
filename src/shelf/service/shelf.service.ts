import { Injectable, Logger } from '@nestjs/common';
import { CreateShelfDto } from '../dto/create-shelf.dto';
import { UpdateShelfDto } from '../dto/update-shelf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shelf } from '../entities/shelf.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { UpdateStatusDto } from 'src/common/update-status.dto';


@Injectable()
export class ShelfService {
  private readonly logger = new Logger('ShelfService');
  constructor(
    @InjectRepository(Shelf)
    private readonly _shelfRepository: Repository<Shelf>

  ) { }

  create(createShelfDto: CreateShelfDto): Promise<Shelf> {
    const newshelf = this._shelfRepository.create(createShelfDto)
    return this._shelfRepository.save(newshelf)
  }

  findAll() {
    return this._shelfRepository.find({ where: { deleted: false } })
  }

  async findOne(id: string) {
    let shelf: Shelf
    if (isUUID(id)) {
      shelf = await this._shelfRepository.findOne({ where: { id: id, deleted : false } })
    }
    if(!isUUID(id)){
      throw new Error('No se encontró registro de este anaquel')
    }
    return shelf;

  }

  async update(id: string, UpdateShelfDto: UpdateShelfDto): Promise<Shelf> {
    const updateShelf = await this._shelfRepository.findOne({ where: { id, deleted: false } });

    if (!updateShelf) {
      throw new Error('Este producto no existe');
    }

    Object.assign(updateShelf, UpdateShelfDto);

    try {
      await this._shelfRepository.save(updateShelf);
    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el producto actualizado');
    }

    return updateShelf;
  }

  async remove(id: string) {
    const shelf = await this._shelfRepository.findOne({ where: { id: id } });
      shelf.deleted = true
      const result = this._shelfRepository.save(shelf)
      console.log('se ha borrado' + JSON.stringify(result))
      return {
        msj: 'Registro eliminado',
        status: true
      }
  }
  async updateState(id: string, stateDto: UpdateStatusDto): Promise<Shelf> {
    const rawMaterial = await this._shelfRepository.findOne({ where: { id: id } });
    rawMaterial.status = stateDto.status;
    return await this._shelfRepository.save(rawMaterial);
  }
}
