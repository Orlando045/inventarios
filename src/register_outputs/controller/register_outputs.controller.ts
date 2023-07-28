import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterOutputsService } from '../services/register_outputs.service';
import { CreateRegisterOutputDto } from '../dto/create-register_output.dto';
import { UpdateRegisterOutputDto } from '../dto/update-register_output.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterOutput } from '../entities/register_output.entity';
import { UpdateStatusDto } from '../../common/update-status.dto';
import { ValidProfiles } from 'src/auth/interfaces/valid-profile';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('register-outputs')
@ApiTags('REGISTER OUTPUT')
export class RegisterOutputsController {
  constructor(private readonly registerOutputsService: RegisterOutputsService) { }

  @Post()
  @Auth(ValidProfiles.admin, ValidProfiles.order)
  create(@Body() createRegisterOutputDto: CreateRegisterOutputDto) {
    return this.registerOutputsService.create(createRegisterOutputDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.registerOutputsService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.registerOutputsService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateRegisterOutputDto: UpdateRegisterOutputDto) {
    return this.registerOutputsService.update(id, updateRegisterOutputDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.registerOutputsService.remove(id);
  }

  @Patch('status/:id')
  @Auth()
  async updateState(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto): Promise<RegisterOutput> {
    return await this.registerOutputsService.updateState(id, UpdateStatusDto);
  }
}
