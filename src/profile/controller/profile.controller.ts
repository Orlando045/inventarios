import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfilesService } from '../services/profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ValidProfiles } from 'src/auth/interfaces/valid-profile';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @Auth(ValidProfiles.admin)
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }
}
