import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../dto/response-user.dto';
import { isUUID } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/login-user..dto';


@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService')


  constructor(
    @InjectRepository(User)
    private readonly _userResitory: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto
      const newUser = this._userResitory.create({
        ...userData, password: bcrypt.hashSync(password, 10)
      });
      const existingUser = await this._userResitory.findOne({
        where: [{ fullName: createUserDto.fullName }, { username: createUserDto.username }],
      });
      if (existingUser) {
        throw new BadRequestException('Ya existe un usuario con ese nombre o correo electrónico');
      }
      await this._userResitory.save(newUser);
      return plainToInstance(ResponseUserDto, newUser);
    } catch (error) {
      this.handlelDBErros(error);
    }
  }

  private handlelDBErros(error: any): never {
    if (error.code == '23505')
      throw new BadRequestException(error.message)
    console.log(error)
    throw new InternalServerErrorException('ya existe un usuario con ese nombre ')
  }

  async createLogin(loginUserDto: LoginUserDto) {
    const { password, username } = loginUserDto

    const user = await this._userResitory.findOne({
      where: { username },
      select: { username: true, password: true }
    })
    if (!user) {
      throw new UnauthorizedException('no se encontró ese username')
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('credentials are not  valid {password}');
    }
    return user;
  }

  findAll() {
    return this._userResitory.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const deletedUser = await this._userResitory.findOne({ where: { id: id } });
    if (!isUUID(id)) {
      throw new Error(`User ${id} does not exist`);
    }
    if (isUUID(id)) {
      return await this._userResitory.remove(deletedUser)
    }
  }

  async rolesUpdate(id: string, roles: string): Promise<User> {
    const product = await this._userResitory.findOne({ where: { id: id } });
    if(!product){
      throw new Error('No se encontró el usuario')
    }

    product.role = roles
    const updatedRecepcion = await this._userResitory.save(product);
    console.log(updatedRecepcion);
    console.log(User)
    return updatedRecepcion;
  }
}
