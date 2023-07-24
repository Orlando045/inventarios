import { CommonEntity } from "src/common/common.entity";
import { Product } from "src/products/entities/product.entity";
import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Recipe extends CommonEntity{
    
    @Column()
    amount_to_use:number;

    @OneToMany(() => RawMaterial, (rawMaterial) => rawMaterial.recipe,{eager: true})
    material: RawMaterial[]

    @ManyToOne(() => Product, (products) => products.recipe,)
    product: Product;
    
}
