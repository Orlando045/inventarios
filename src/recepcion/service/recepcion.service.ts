import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecepcionDto } from '../dto/create-recepcion.dto';
import { UpdateRecepcionDto } from '../dto/update-recepcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recepcion } from '../entities/recepcion.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseRecepcionDto } from '../dto/response-recepcion.dto';
import { RegisterOutput } from 'src/register_outputs/entities/register_output.entity';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Injectable()
export class RecepcionService {
  private readonly logger = new Logger('RecepcionService');

  constructor(
    @InjectRepository(Recepcion)
    private readonly _recepcionRepository: Repository<Recepcion>,
    @InjectRepository(RegisterOutput)
    private readonly _registerRepository: Repository<RegisterOutput>,
  ) { }

  async create(createRecepcionDto: CreateRecepcionDto) {
    const newRecepcion = this._recepcionRepository.create(createRecepcionDto);
    let recepcion: Recepcion;

    let listRegister: RegisterOutput[] = [];
    for (const id of createRecepcionDto.registerOutId) {
      const register = await this._registerRepository.findOneBy({ id: id });
      if (!register) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(register));
      listRegister.push(register);
    }
    newRecepcion.registerOut = listRegister;
    console.log(RegisterOutput)

    try {
      recepcion = await this._recepcionRepository.save(newRecepcion);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
    }
    return plainToInstance(ResponseRecepcionDto, recepcion);
  }
  findAll() {
    return this._recepcionRepository.find({where: {deleted: false}})
  }

  findOne(id: string) {
    const recepcion = this._recepcionRepository.findOne({
      where: { id: id },
      relations: ['registerOut'],
    });
    if (!recepcion) {
      throw new NotFoundException('registro de partida no encontrado');
    }
    return plainToInstance(ResponseRecepcionDto, recepcion);
  }

  async update(id: string, updateRecepcionDto: UpdateRecepcionDto) {
    console.log(id)
    const updateRecepcion: Recepcion = await this._recepcionRepository.findOne(
      { where: { id: id, deleted: false } });
    if (!updateRecepcion) {
      throw new Error('No se encontro el registro')
    }
    console.log(JSON.stringify(updateRecepcion))

    Object.assign(updateRecepcion, updateRecepcionDto);

    if (updateRecepcionDto.registerOutId) {
      const recepcion = await this._registerRepository.createQueryBuilder('registerOut')
        .whereInIds(updateRecepcionDto.registerOutId)
        .getMany();

      updateRecepcion.registerOut = recepcion;
    }

    try {
      await this._recepcionRepository.save(updateRecepcion);

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseRecepcionDto, updateRecepcion);

  }

  async remove(id: string) {
    const recepcion = await this._recepcionRepository.findOne({ where: { id: id } });
    recepcion.deleted = true
    const result = this._recepcionRepository.save(recepcion)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }
  async borrarRegistroPermanente(id: string): Promise<{ msj: string, status: boolean }> {
    const recepcion = await this._recepcionRepository.findOne({ where: { id: id } });

    if (!recepcion) {
      return {
        msj: 'No se encontró el registro',
        status: false
      }
    }

    await this._recepcionRepository.delete({ id: id });
    return {
      msj: 'Registro eliminado permanentemente',
      status: true
    }
  }
  async updateState(id: string, stateDto: UpdateStatusDto): Promise<Recepcion> {
    const rawMaterial = await this._recepcionRepository.findOne({ where: { id: id } });
    rawMaterial.status = stateDto.status;
    return await this._recepcionRepository.save(rawMaterial);
  }


  async updateOrderStatus(id: string, order: string): Promise<Recepcion> {
    const recepcion = await this._recepcionRepository.findOne({ where: { id } });

    recepcion.orderStatus = order
    const updatedRecepcion = await this._recepcionRepository.save(recepcion);
    console.log(updatedRecepcion);
    return updatedRecepcion;
  }
}
