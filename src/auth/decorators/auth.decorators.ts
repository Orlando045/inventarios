import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ValidProfiles } from "../interfaces/valid-profile";
import { ProfileProtected } from "./profile-protected.decorator";
import { UserProfileGuard } from "../guards/use-profile.guard";

export function Auth(...profiles: ValidProfiles[]) {
    return applyDecorators(
      ProfileProtected(...profiles),
      UseGuards(AuthGuard(), UserProfileGuard),
      ApiBearerAuth(),
    );
  }