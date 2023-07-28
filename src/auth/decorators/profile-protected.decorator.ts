import { SetMetadata } from "@nestjs/common";
import { ValidProfiles } from "../interfaces/valid-profile";

export const META_PROFILES = 'profiles';

export const ProfileProtected = (...args: ValidProfiles[]) => {
  return SetMetadata(META_PROFILES, args);
}