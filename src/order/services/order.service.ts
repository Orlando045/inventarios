import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { isUUID } from 'class-validator';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('OrderService');
  constructor(
    @InjectRepository(Order)
    private readonly _orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) { }


  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this._orderRepository.create(createOrderDto)
    let order: Order

    const listOrder: Product[] = [];
    for (const id of createOrderDto.productId) {
      const temp = await this._productRepository.findOneBy({ id: id })
      if (!temp) {
        throw new Error('no se encontró el registro')
      }
      console.log(JSON.stringify(temp));
      listOrder.push(temp);
    }
    try {
      newOrder.product = listOrder;
      order = await this._orderRepository.save(newOrder);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
    }
    return plainToInstance(ResponseOrderDto, order);
  }

  findAll() {
    return this._orderRepository.find({where: {deleted: false}});
  }

  findOne(id: string) {
    const order = this._orderRepository.findOne({ where: { id: id } })
    if (!isUUID(id)) {
      throw new Error('no se econtró registro')
    }
    if (isUUID(id)) {
      return plainToInstance(ResponseOrderDto, order)
    }
  }
  

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    console.log(id)
    const updateOrder: Order = await this._orderRepository.findOne({ where: { id: id }, relations: ['product'] })
    if (!updateOrder) {
      throw new Error('Este producto no existe');
    }

    Object.assign(updateOrder, updateOrderDto);

    if (updateOrderDto.productId) {
      const prod = await this._productRepository.createQueryBuilder('product')
        .whereInIds(updateOrderDto.productId)
        .getMany();

        updateOrder.product = prod;
    }

    try {
      await this._orderRepository.save(updateOrder);

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseOrderDto, updateOrder);

  }

  async remove(id: string) {
    const order = await this._orderRepository.findOne({ where: { id: id } });
    order.deleted = true
    const result = this._orderRepository.save(order)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }

  async updateState(id: string, stateDto: UpdateStatusDto): Promise<Order> {
    const order = await this._orderRepository.findOne({ where: { id: id } });
    order.status = stateDto.status;
    return await this._orderRepository.save(order);
  }

 
}
