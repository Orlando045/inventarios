import { CommonEntity } from "src/common/common.entity";
import { Product } from "src/products/entities/product.entity";
import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class LoteOfProduct extends CommonEntity {

    @Column(
        {
            nullable: true,
            name: 'lote'
        }
    )
    folio: string;

    @Column(
        {
             type: 'uuid', default: () => 'uuid_generate_v4()' 
        }
    )
    idLote: string


    @ManyToMany(()=> Product, (produ)=> produ.loteOfProduct,{eager: true})
    @JoinTable()
    produ: Product[];

    @ManyToMany(()=>RawMaterial, (rMaterial)=>rMaterial.loteof, {eager: true})
    @JoinTable()
    materialR: RawMaterial[];
}
