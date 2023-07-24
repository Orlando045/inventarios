import { Module } from '@nestjs/common';
import { ShelfService } from './service/shelf.service';
import { ShelfController } from './controller/shelf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelf } from './entities/shelf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shelf])],
  controllers: [ShelfController],
  providers: [ShelfService]
})
export class ShelfModule {}
