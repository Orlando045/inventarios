import { Module } from '@nestjs/common';
import { RecipeService } from './services/recipe.service';
import { RecipeController } from './controller/recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Recipe, RawMaterial])],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
