import { SetMetadata } from '@nestjs/common';
import { Profile } from 'src/profile/entities/profile.entity';


export const Roles = (...roles: Profile[]) => SetMetadata('roles', roles);