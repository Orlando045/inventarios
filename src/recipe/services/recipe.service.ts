import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RawMaterial } from 'src/raw_material/entities/raw_material.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseRecipeDto } from '../dto/response-recipe.dto';
import { UpdateStatusDto } from 'src/common/update-status.dto';

@Injectable()
export class RecipeService {
  private readonly logger = new Logger('RecepcionService');

  constructor(
    @InjectRepository(Recipe)
    private readonly _recipeRepository: Repository<Recipe>,
    @InjectRepository(RawMaterial)
    private readonly _rawMaterialRepository: Repository<RawMaterial>,
  ) { }
  
  async create(createRecipeDto: CreateRecipeDto) {
    const newRecipe = await this._recipeRepository.create(createRecipeDto)
    let recipe : Recipe

    const listMaterial: RawMaterial [] = [];
    for(const id of createRecipeDto.materialId){
      const material = await this._rawMaterialRepository.findOneBy({id: id})
      if (!material) {
        this.logger.log('materia prima no encontrada');
      }
      console.log(JSON.stringify(material));
      listMaterial.push(material)
  }
  try {
    newRecipe.material = listMaterial;
    recipe = await this._recipeRepository.save(newRecipe)
  } catch (error) {
    this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(
        'Error interno del servidor, contacte al administrador',
      );
  }
  return plainToInstance(ResponseRecipeDto, recipe);
}

  findAll() {
    return this._recipeRepository.find({where: {deleted: false}})
  }

  findOne(id: string) {
    const recipe = this._recipeRepository.findOne({ where: { id: id }, relations: ['rawMaterial'] })

    if (!recipe) {
      throw new NotFoundException('registro de partida no encontrado');
    }
    return plainToInstance(ResponseRecipeDto, recipe);
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const updateRecipe = await this._recipeRepository.findOne({
      where: { id }, relations: ['rawMaterial'] });
      
    if (!updateRecipe) {
      throw new NotFoundException('registro de partida no encontrado');
    }

    Object.assign(updateRecipe, updateRecipeDto);
    if (updateRecipeDto.materialId) {
      const rawMaterials = await this._rawMaterialRepository.createQueryBuilder('rawMaterial')
        .whereInIds(updateRecipeDto.materialId)
        .getMany();
  
      updateRecipe.material = rawMaterials;
    }
    try {
      await this._recipeRepository.save(updateRecipe);
      
    } catch (error) {
      console.log(error);
      throw new Error('No se pudo guardar el registro actualizado');
    }
    return plainToInstance(ResponseRecipeDto, updateRecipe);
  }

  async remove(id: string) {
    const recipe = await this._recipeRepository.findOne({ where: { id: id } });
    recipe.deleted = true
    const result = this._recipeRepository.save(recipe)
    console.log('se ha borrado' + JSON.stringify(result))
    return {
      msj: 'Registro eliminado',
      status: true
    }
  }
  async updateState(id: string, stateDto: UpdateStatusDto): Promise<Recipe> {
    const rawMaterial = await this._recipeRepository.findOne({ where: { id: id } });
    rawMaterial.status = stateDto.status;
    return await this._recipeRepository.save(rawMaterial);
  }
}
