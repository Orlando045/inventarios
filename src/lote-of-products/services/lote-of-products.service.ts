import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateLoteOfProductDto } from '../dto/create-lote-of-product.dto';
import { UpdateLoteOfProductDto } from '../dto/update-lote-of-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoteOfProduct } from '../entities/lote-of-product.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseLoteOfProductDto } from '../dto/response-lote-of-product.dto';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class LoteOfProductsService {
private readonly logger = new Logger('LoteOfProductsService')

constructor(
  @InjectRepository(LoteOfProduct)
  private  readonly _loteOfProductRepository: Repository<LoteOfProduct>,
  @InjectRepository(Product)
  private  readonly _productRepository: Repository<Product>,
  @InjectRepository(RawMaterial)
  private  readonly _rawMaterialRepository: Repository<RawMaterial>,
){}

  async create(createLoteOfProductDto: CreateLoteOfProductDto) {
    const newLote = await this._loteOfProductRepository.create(createLoteOfProductDto);
    let lote : LoteOfProduct;

    const listProduct: Product[] = []
    for(const id of createLoteOfProductDto.produId){
      const product = await this._productRepository.findOneBy({id: id})
      if(!product){
        this.logger.log('materia prima no encontrada');
    }
    console.log(JSON.stringify(product));
    listProduct.push(product);
  }
  newLote.produ = listProduct;


  const listRawMaterial: RawMaterial[] = []
    for(const id of createLoteOfProductDto.materialRId){
      const raw = await this._rawMaterialRepository.findOneBy({id: id})
      if(!raw){
        this.logger.log('materia prima no encontrada');
    }
    console.log(JSON.stringify(raw));
    listRawMaterial.push(raw);
  }
  newLote.materialR = listRawMaterial;
try {
  lote = await this._loteOfProductRepository.save(newLote);
} catch (error) {
  this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
    }
    return plainToInstance(ResponseLoteOfProductDto, lote);
  }
  findAll() {
    return this._loteOfProductRepository.find({where: {deleted: false}});
  }

  async findOne(id: string) {
    const lote = await this._loteOfProductRepository.findOne({where: {id: id}});
    if(!isUUID(id)){
      throw new Error('no se enontró registro')
    }
    if(isUUID(id)){
      return plainToInstance(ResponseLoteOfProductDto, lote);
    }
  }

  async update(id: string, updateLoteOfProductDto: UpdateLoteOfProductDto) {
   const updateLote : LoteOfProduct = await this._loteOfProductRepository.findOne({where: {id: id}, relations: ['produ', 'materialR']})
   if(!updateLote){
    throw new Error('no se encontró el registro')
   }
   Object.assign(updateLote, updateLoteOfProductDto)

   if(updateLoteOfProductDto.produId){
    const product = await this._productRepository.createQueryBuilder('produ')
    .whereInIds(updateLoteOfProductDto.produId)
    .getMany()
    updateLote.produ = product;
   }

   if(updateLoteOfProductDto.materialRId){
    const material = await this._rawMaterialRepository.createQueryBuilder('material')
    .whereInIds(updateLoteOfProductDto.materialRId)
    .getMany()
    updateLote.materialR = material;
   }
   try {
    await this._productRepository.save(updateLote)
   } catch (error) {
    console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
   }
   return plainToInstance(ResponseLoteOfProductDto, updateLote);
  }

  async remove(id: string) {
    const product = await this._loteOfProductRepository.findOne({where: {id: id}})
    product.deleted = true
    const result = this._loteOfProductRepository.save(product)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }
}
