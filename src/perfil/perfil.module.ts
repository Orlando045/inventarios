import { Module } from '@nestjs/common';
import { PerfilService } from './services/perfil.service';
import { PerfilController } from './controller/perfil.controller';

@Module({
  controllers: [PerfilController],
  providers: [PerfilService]
})
export class PerfilModule {}
