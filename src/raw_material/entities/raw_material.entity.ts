import { CommonEntity } from "src/common/common.entity";
// import { Inventario } from "src/inventario/entities/inventario.entity";
import { Inventory } from "src/inventory/entities/inventory.entity";
import { LoteOfProduct } from "src/lote-of-products/entities/lote-of-product.entity";
import { RawMaterialRequired } from "src/raw-material-required/entities/raw-material-required.entity";
import { CreateRawMaterialUsedDto } from "src/raw-material-used/dto/create-raw-material-used.dto";
import { RawMaterialUsed } from "src/raw-material-used/entities/raw-material-used.entity";
import { Recipe } from "src/recipe/entities/recipe.entity";
import { RegisterOutput } from "src/register_outputs/entities/register_output.entity";
import { ScannedOrder } from "src/scanned-order/entities/scanned-order.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'raw_material' })
export class RawMaterial extends CommonEntity {
  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
    name: 'name'
  })
  name: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: true,
    name: 'scaneId',
  })
  scaneId: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'description',
  })
  description: string;

  @ManyToMany(() => RegisterOutput, (output) => output.rawMaterial, { cascade: true })
  registerOutput: RegisterOutput[];

  @ManyToMany(() => Inventory, (inventary) => inventary.rawMaterial_, { cascade: true })
  inventory: Inventory[]

  @ManyToOne(() => Recipe, (recipe) => recipe.material, { cascade: true })
  recipe: Recipe[]

  @ManyToOne(() => RawMaterialRequired, (required) => required.raw)
  mraw: RawMaterialRequired;

  @ManyToOne(() => RawMaterialUsed, (used) => used.rawM, { cascade: true })
  used: RawMaterialUsed[];

  @ManyToMany(()=> LoteOfProduct, (loteP)=> loteP.materialR, { cascade: true })
  loteof: LoteOfProduct[];

  @ManyToOne(()=>ScannedOrder, (scanned)=>scanned.mater, { cascade: true })
  scannedOrder: ScannedOrder;
}

