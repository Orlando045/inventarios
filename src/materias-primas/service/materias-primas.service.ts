import { Injectable } from '@nestjs/common';
import { CreateMateriasPrimaDto } from '../dto/create-materias-prima.dto';
import { UpdateMateriasPrimaDto } from '../dto/update-materias-prima.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MateriasPrima } from '../entities/materias-prima.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';


@Injectable()
export class MateriasPrimasService {

  constructor(
    @InjectRepository(MateriasPrima)
    private _MateriasPrimasRepository: Repository<MateriasPrima>,

  ) { }


  create(createMateriasPrimaDto: CreateMateriasPrimaDto): Promise<MateriasPrima> {
    const newMateriaPrima = this._MateriasPrimasRepository.create(createMateriasPrimaDto)
    return this._MateriasPrimasRepository.save(newMateriaPrima)
  }

  findAll() {
    return this._MateriasPrimasRepository.find({where : {deleted : true}});
  }

  async findOne(id: string) {
   let materiaP: MateriasPrima
    if (isUUID(id)) {
      materiaP = await this._MateriasPrimasRepository.findOne({ where: { id: id } })
    }
    if(!isUUID(id)){
      throw new Error('este producto no existe')
    }
    return materiaP;
  }

  async update(id: string, updateMateriasPrimaDto: UpdateMateriasPrimaDto) {
    console.log(id)
    const materia_p : MateriasPrima= await this._MateriasPrimasRepository.findOne({ where: { id: id, deleted : true} });
    if (!materia_p) {
      throw new Error('Este producto no existe')
    }

    console.log(JSON.stringify(materia_p))

    const temp = Object.assign(materia_p, updateMateriasPrimaDto)
    // this.productRepository.merge(product, updateProductDto)
    let resp;
    try {
      resp = await this._MateriasPrimasRepository.save(temp);
    } catch (error) {
      console.log(error)
    }

    return resp;
    }  


    async remove(id: string) {
      const materia_p = await this._MateriasPrimasRepository.findOne({ where: { id: id } });
      materia_p.deleted = true
      const result = this._MateriasPrimasRepository.save(materia_p)
      console.log('se ha borrado' + JSON.stringify(result))
      return {
        msj: 'Registro eliminado',
        status: true
      }
    }
}
