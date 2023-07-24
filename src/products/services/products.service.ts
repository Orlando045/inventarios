import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateStatusDto } from 'src/common/update-status.dto';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseProducrtsDto } from '../dto/response-products.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
    @InjectRepository(Recipe)
    private readonly _recipeRepository: Repository<Recipe>,
  ) {}

  async create(createProductDto: CreateProductDto) {
  const newProduct = await this._productRepository.create(createProductDto);
  let product : Product

  let listRecipe : Recipe [] = [];
  for (const id of createProductDto.recipeId){
    const temp = await this._recipeRepository.findOneBy({id: id})
    if (!temp) {
      this.logger.log('materia prima no encontrada');
    }
    console.log(JSON.stringify(temp));
    listRecipe.push(temp);
  }
  newProduct.recipe = listRecipe;
  
  
  try {
    product = await this._productRepository.save(newProduct);
    console.log(Recipe)
  } catch (error) {
    this.logger.error('Error: ' + error.message);
    throw new InternalServerErrorException(
      'Error interno del servidor, contacte al administrador',
    );
  }
  return plainToInstance(ResponseProducrtsDto, product);
}

  findAll() {
    return this._productRepository.find({where: {deleted: false}});
  }

  findOne(id: string) {
    const product = this._productRepository.findOne({where: {id: id}})
    if(!isUUID(id)){
      throw new Error('no se enontró registro');
    }
    if(isUUID(id)){
      return plainToInstance(ResponseProducrtsDto, product);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    console.log(id)
    const updateproduct: Product = await this._productRepository.findOne({ where: { id: id }, relations: ['recipe'] })
    if (!updateproduct) {
      throw new Error('Este producto no existe');
    }

    Object.assign(updateproduct, updateProductDto);

    if (updateProductDto.recipeId) {
      const raw_materia = await this._recipeRepository.createQueryBuilder('recipe')
        .whereInIds(updateProductDto.recipeId)
        .getMany();

        updateproduct.recipe = raw_materia;
    }
    try {
      await this._productRepository.save(updateproduct);

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseProducrtsDto, updateproduct);

  }

  async remove(id: string) {
    const product = await this._productRepository.findOne({ where: { id: id } });
    product.deleted = true
    const result = this._productRepository.save(product)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }
  async updateState(id: string, stateDto: UpdateStatusDto): Promise<Product> {
    const rawMaterial = await this._productRepository.findOne({ where: { id: id } });
    rawMaterial.status = stateDto.status;
    return await this._productRepository.save(rawMaterial);
  }

  async updateOrderStatus(id: string, order: string): Promise<Product> {
    const product = await this._productRepository.findOne({ where: { id: id } });

    product.orderStatus = order
    const updatedRecepcion = await this._productRepository.save(product);
    console.log(updatedRecepcion);
    return updatedRecepcion;
  }
}
