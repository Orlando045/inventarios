import { CommonEntity } from "src/common/common.entity";
import { Inventory } from "src/inventory/entities/inventory.entity";
import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class RawMaterialRequired extends CommonEntity {
    @Column({
        nullable: true,
        type: 'numeric'
    })
    amount: number

    @Column({
        nullable: true,
        type: 'numeric'
    })
    scannedQuantity: number;

    @OneToMany(() => Inventory, (invent) => invent.required, { eager: true })
    @JoinTable()
    inventories: Inventory[];

    @OneToMany(() => RawMaterial, rawMaterial => rawMaterial.mraw, { eager: true })
    @JoinTable()
    raw: RawMaterial[];


}
