import { CommonEntity } from "src/common/common.entity";
import { Inventory } from "src/inventory/entities/inventory.entity";
import { Shelf } from "src/shelf/entities/shelf.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Warehouse extends CommonEntity {
  @Column(
    {
      nullable: true,
    }
  )
  name: string;

  @Column(
    {
      nullable: true,
    }
  )
  description: string;

  @OneToMany(() => Shelf, shelf => shelf.warehouse, { eager: true })
  shelves: Shelf[];


  @ManyToOne(() => Inventory, (inventori) => inventori.wareh,)
  inventori: Inventory[];
}
