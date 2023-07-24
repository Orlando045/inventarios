import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateManufactureOrderDto } from '../dto/create-manufacture-order.dto';
import { UpdateManufactureOrderDto } from '../dto/update-manufacture-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufactureOrder } from '../entities/manufacture-order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseManufactureOrderDto } from '../dto/response-manufacture-order.dto';
import { isUUID } from 'class-validator';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Injectable()
export class ManufactureOrderService {
  private readonly logger = new Logger('ManufactureOrderService');
  constructor(
    @InjectRepository(ManufactureOrder)
    private readonly _manufactureorderRepository: Repository<ManufactureOrder>,
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) { }

  async create(createManufactureOrderDto: CreateManufactureOrderDto) {
    const newManufactureOrder = await this._manufactureorderRepository.create(createManufactureOrderDto)
    let manufacturerOrder: ManufactureOrder

    let list: Product[] = []
    for (const id of createManufactureOrderDto.productsId) {
      const temp = await this._productRepository.findOneBy({ id: id })
      if (!temp) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    newManufactureOrder.products = list;

    try {
      manufacturerOrder = await this._manufactureorderRepository.save(newManufactureOrder)
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',);
    }
    return plainToInstance(ResponseManufactureOrderDto, manufacturerOrder);
  }


  findAll() {
    return this._manufactureorderRepository.find({where:{deleted: false}});
  }

  findOne(id: string) {
    const manufacture = this._manufactureorderRepository.findOne({ where: { id: id } })
    if (!isUUID(id)) {
      throw new Error('no se econtró registro')
    }
    if (isUUID(id)) {
      return plainToInstance(ResponseManufactureOrderDto, manufacture)
    }
  }


  async update(id: string, updateManufactureOrderDto: UpdateManufactureOrderDto) {
    console.log(id)
    const updateManufactureOrder: ManufactureOrder = await this._manufactureorderRepository.findOne({ where: { id: id }, relations: ['products'] })
    if (!updateManufactureOrder) {
      throw new Error('Este producto no existe');
    }

    Object.assign(updateManufactureOrder, updateManufactureOrderDto);

    if (updateManufactureOrderDto.productsId) {
      const manufacture = await this._productRepository.createQueryBuilder('products')
        .whereInIds(updateManufactureOrderDto.productsId)
        .getMany();
      updateManufactureOrder.products = manufacture;
    }
    try {
      await this._manufactureorderRepository.save(updateManufactureOrder);

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseManufactureOrderDto, updateManufactureOrder);

  }

  async remove(id: string) {
    const manufacture = await this._manufactureorderRepository.findOne({ where: { id: id } });
    manufacture.deleted = true
    const result = this._manufactureorderRepository.save(manufacture)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }

  async updateState(id: string, stateDto: UpdateStatusDto): Promise<ManufactureOrder> {
    const manufacture = await this._manufactureorderRepository.findOne({ where: { id: id } });
    manufacture.status = stateDto.status;
    return await this._manufactureorderRepository.save(manufacture);
  }
  async updateOrderStatus(id: string, order: string): Promise<ManufactureOrder> {
    const product = await this._manufactureorderRepository.findOne({ where: { id: id } });

    product.orderStatus = order
    const updatedRecepcion = await this._manufactureorderRepository.save(product);
    console.log(updatedRecepcion);
    return updatedRecepcion;
  }
}
