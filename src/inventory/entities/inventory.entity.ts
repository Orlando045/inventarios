import { CommonEntity } from "src/common/common.entity";
import { RawMaterialRequired } from "src/raw-material-required/entities/raw-material-required.entity";
import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Shelf } from "src/shelf/entities/shelf.entity";
import { Warehouse } from "src/warehouse/entities/warehouse.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Inventory extends CommonEntity {
    @Column(
        {
            type: 'varchar',
            length: 100,
            nullable: true,
        }
    )
    description: string;


    @Column(
        {
            nullable: true,
        }
    )
    dateOfExpiry: string;

    @Column(
        {
            nullable: true,
            type: 'numeric'
        }
    )
    amount: number;

    @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
    idpackage: string;

    @ManyToMany(() => RawMaterial, (material) => material.inventory, { eager: true })
    @JoinTable()
    rawMaterial_: RawMaterial[];

    @OneToMany(() => Warehouse, (wareh) => wareh.inventori, { eager: true })
    @JoinTable()
    wareh: Warehouse[];

    @ManyToMany(() => Shelf, (shelf) => shelf.iventory, { eager: true })
    @JoinTable()
    shelf: Shelf[]

    @ManyToOne(() => RawMaterialRequired, (required) => required.inventories,)
    required: RawMaterialRequired
}

