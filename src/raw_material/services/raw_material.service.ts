import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RawMaterial } from '../entities/raw_material.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { UpdateRawMaterialDto } from '../dto/update-raw_material.dto';
import { CreateRawMaterialDto } from 'src/raw_material/dto/create-raw-material.dto';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectRepository(RawMaterial)
    private _rawMateriaRepository: Repository<RawMaterial>,

  ) { }

  create(createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
    const newrawMateria = this._rawMateriaRepository.create(createRawMaterialDto)
    return this._rawMateriaRepository.save(newrawMateria)
  }

  findAll() {
    return this._rawMateriaRepository.find({ where: { deleted: false } });
  }

  async findOne(id: string) {
    let raw_material: RawMaterial
    if (isUUID(id)) {
      raw_material = await this._rawMateriaRepository.findOne({ where: { id: id } })
    }
    if (!isUUID(id)) {
      throw new Error('este producto no existe')
    }
    return raw_material;
  }

  async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto): Promise<RawMaterial> {
    const rawMaterial = await this._rawMateriaRepository.findOne({ where: { id, deleted: false } });

    if (!rawMaterial) {
      throw new Error('Este producto no existe');
    }
    console.log(JSON.stringify(rawMaterial));

    Object.assign(rawMaterial, updateRawMaterialDto);

    try {
      await this._rawMateriaRepository.save(rawMaterial);
    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el producto actualizado');
    }

    return rawMaterial;
    // async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto): Promise<RawMaterial>{
    //   console.log(id)
    //   const raw_material: RawMaterial = await this._rawMateriaRepository.findOne({ where: { id: id, deleted: false } });
    //   if (!raw_material) {
    //   throw new Error('Este producto no existe')
    //   }
    //   console.log(JSON.stringify(raw_material))
    //   const temp = Object.assign(raw_material, UpdateRawMaterialDto)
    //   let resp;
    //   try {
    //   resp = await this._rawMateriaRepository.save(temp);
    //   } catch (error) {
    //   console.log(error)
    //   }
    //   return temp;
    //   }
  }


  async remove(id: string) {
    const raw_material = await this._rawMateriaRepository.findOne({ where: { id: id } });
    raw_material.deleted = true
    const result = this._rawMateriaRepository.save(raw_material)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }

  async updateState(id: string, stateDto: UpdateStatusDto): Promise<RawMaterial> {
    const rawMaterial = await this._rawMateriaRepository.findOne({ where: { id: id } });
    rawMaterial.status = stateDto.status;
    return await this._rawMateriaRepository.save(rawMaterial);
  }
}

