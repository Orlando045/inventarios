import { CommonEntity } from "src/common/common.entity";
import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Column, Entity, JoinTable, OneToMany } from "typeorm";

@Entity()
export class ScannedOrder extends CommonEntity {

    @Column(
        {
            type: 'numeric',
            nullable: true
        }
    )
    amountPackage: number

    @OneToMany(()=> RawMaterial, (mater)=> mater.scannedOrder, {eager: true} )
    @JoinTable()
    mater : RawMaterial[]
}
