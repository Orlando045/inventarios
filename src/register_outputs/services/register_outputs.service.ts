import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRegisterOutputDto } from '../dto/create-register_output.dto';
import { UpdateRegisterOutputDto } from '../dto/update-register_output.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterOutput } from '../entities/register_output.entity';
import { Repository } from 'typeorm';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseRegiterOutputDto } from '../dto/reponse-register_Output.dto';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Injectable()
export class RegisterOutputsService {
  private readonly logger = new Logger('registerOutputsService');

  constructor(
    @InjectRepository(RegisterOutput)
    private readonly _RegisterOutputRepository: Repository<RegisterOutput>,
    @InjectRepository(RawMaterial)
    private readonly _RawMaterialRepository: Repository<RawMaterial>,
  ) { }

  async create(createRegisterOutputDto: CreateRegisterOutputDto) {
    const newRegisterOutput = this._RegisterOutputRepository.create(createRegisterOutputDto,);
    let registerOutput: RegisterOutput;

    console.log("array: " + JSON.stringify(createRegisterOutputDto.rawMaterialId));
    const list: RawMaterial[] = [];
    for (const id of createRegisterOutputDto.rawMaterialId) {
      const temp = await this._RawMaterialRepository.findOneBy({ id: id });
      if (!temp) {

        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    try {
      newRegisterOutput.rawMaterial = list;
      registerOutput = await this._RegisterOutputRepository.save(newRegisterOutput);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor contacte al administrador',
      );
    }
    return plainToInstance(ResponseRegiterOutputDto, registerOutput);
  }

  findAll() {
    return this._RegisterOutputRepository.find({where: {deleted: false}})
  }

  findOne(id: string) {
    const register_Output = this._RegisterOutputRepository.findOne({ where: { id: id }, relations: ['rawMaterial'] })

    if (!register_Output) {
      throw new NotFoundException('registro de partida no encontrado');
    }
    return plainToInstance(ResponseRegiterOutputDto, register_Output);
  }

  async update(id: string, updateRegisterOutputDto: UpdateRegisterOutputDto) {
    const updateRegister = await this._RegisterOutputRepository.findOne({
      where: { id }, relations: ['rawMaterial']
    });

    if (!updateRegister) {
      throw new NotFoundException('registro de partida no encontrado');
    }

    Object.assign(updateRegister, updateRegisterOutputDto);
    if (updateRegisterOutputDto.rawMaterialId) {
      const rawMaterials = await this._RawMaterialRepository.createQueryBuilder('rawMaterial')
        .whereInIds(updateRegisterOutputDto.rawMaterialId)
        .getMany();

      updateRegister.rawMaterial = rawMaterials;
    }
    try {
      await this._RegisterOutputRepository.save(updateRegister);

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseRegiterOutputDto, updateRegister);
  }

  async remove(id: string) {
    const registerOutput = await this._RegisterOutputRepository.findOne({ where: { id: id } });
    registerOutput.deleted = true
    const result = this._RegisterOutputRepository.save(registerOutput)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }
  async updateState(id: string, stateDto: UpdateStatusDto): Promise<RegisterOutput> {
    const rawMaterial = await this._RegisterOutputRepository.findOne({ where: { id: id } });
    rawMaterial.status = stateDto.status;
    return await this._RegisterOutputRepository.save(rawMaterial);
  }
}
