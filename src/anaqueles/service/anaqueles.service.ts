import { Injectable, Logger } from '@nestjs/common';
import { CreateAnaqueleDto } from '../dto/create-anaquele.dto';
import { UpdateAnaqueleDto } from '../dto/update-anaquele.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anaquele } from '../entities/anaquele.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';


@Injectable()
export class AnaquelesService {

  private readonly logger = new Logger(AnaquelesService.name);

constructor(
  @InjectRepository(Anaquele)
  private _AnaquelRepository: Repository<Anaquele>,
){}


  create(createAnaqueleDto: CreateAnaqueleDto): Promise<Anaquele> {
    const newanaquele = this._AnaquelRepository.create(createAnaqueleDto)
    return this._AnaquelRepository.save(newanaquele)
  }

  findAll() {
    return this._AnaquelRepository.find({ where: { deleted: false } });
  }

  async findOne(id: string) {
    let anaquele : Anaquele
    if(isUUID(id)){
      anaquele = await this._AnaquelRepository.findOne({where : { id : id, deleted: false }})
    }
    if(!isUUID(id)){
      throw new Error('Este anaquele no se encontró')
    }
    return anaquele
  }

  async update(id: string, updateAnaqueleDto: UpdateAnaqueleDto) {
    console.log(id)
    const anaquele : Anaquele= await this._AnaquelRepository.findOne({ where: { id: id } });
    if (!anaquele) {
      throw new Error('Este producto no existe')
    }

    console.log(JSON.stringify(anaquele))

    const temp = Object.assign(anaquele, updateAnaqueleDto)
    // this.productRepository.merge(product, updateProductDto)
    let resp;
    try {
      resp = await this._AnaquelRepository.save(temp);
    } catch (error) {
      console.log(error)
    }

    return resp;
    }  


    async remove(id: string) {
      const anaquele = await this._AnaquelRepository.findOne({ where: { id: id } });
      anaquele.deleted = true
      const result = this._AnaquelRepository.save(anaquele)
      console.log('se ha borrado' + JSON.stringify(result))
      return {
        msj: 'Registro eliminado',
        status: true
      }
    }
}
