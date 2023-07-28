import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Profile } from 'src/profile/entities/profile.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../dto/response-user.dto';
@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService')
  constructor(
    @InjectRepository(User)
    private readonly _userRespository: Repository<User>,
    @InjectRepository(Profile)
    private readonly _profileRespository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this._userRespository.create(createUserDto);
    let user: User;

    const list: Profile[] = [];
    for (const id of createUserDto.profilesId) {
      const temp = await this._profileRespository.findOneBy({ id: id });
      if (!temp) {
        throw new NotFoundException('role not found');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    try {
      newUser.profiles = list;
      user = await this._userRespository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async findAll() {
    const listUser = await this._userRespository.find({
      relations: ['profiles'],
      where: { deleted: false },
    });
    return plainToInstance(ResponseUserDto, listUser);
  }

  async findOne(id: string) {
    const user = await this.internalFindOne(id);
    return plainToInstance(ResponseUserDto, user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ConflictException('Duplicate entry in database');
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  private async internalFindOne(id: string) {
    const user = await this._userRespository.findOne({
      relations: ['profiles'],
      where: { id: id, deleted: false },
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findByEmail(username: string) {
    const user = await this._userRespository.findOne({
      relations: ['profiles'],
      where: { username: username },
    });
    if (!user) {
      this.logger.warn(`User ${username} not found`);
      return null;
    }
    return user;
  }
}
