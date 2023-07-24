import { CommonEntity } from "src/common/common.entity";
import { Inventory } from "src/inventory/entities/inventory.entity";
import { Warehouse } from "src/warehouse/entities/warehouse.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Shelf extends CommonEntity {
    @Column({
        nullable: true, 
    })
    name: string

    @Column({
        nullable: true,
    })
    description: string

    @ManyToMany(() => Inventory, (inventory) => inventory.shelf,)
      iventory : Inventory[]

      
      @ManyToOne(() => Warehouse, warehouse => warehouse.shelves)
      warehouse: Warehouse;
}
