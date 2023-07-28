import { ConfigService } from '@nestjs/config';
import { UserService } from '../services/user.service';
import { ProfilesService } from 'src/profile/services/profile.service';
import { ConfigKeys } from 'src/utils/keys/configs.key';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidProfiles } from 'src/auth/interfaces/valid-profile';


export const setDefaultUser = async (
  _configService: ConfigService,
  _userService: UserService,
  _profileService: ProfilesService,
) => {
  const defaultUser = await _userService.findByEmail(
    _configService.get<string>(ConfigKeys.DEFAULT_USERNAME),
  );

  if (!defaultUser) {
    const newUser = new CreateUserDto();
    newUser.username = _configService.get<string>(ConfigKeys.DEFAULT_USERNAME);
    newUser.password = _configService.get<string>(ConfigKeys.DEFAULT_PASSWORD);

    const profile = await _profileService.findByName(ValidProfiles.admin);

    newUser.profilesId = [profile.id];
    console.log(JSON.stringify(newUser));
    const adminUser = await _userService.create(newUser);
    console.log(JSON.stringify(adminUser));
    return adminUser;
  }

  console.warn('DEFAULT USER: ' + JSON.stringify(defaultUser));
};