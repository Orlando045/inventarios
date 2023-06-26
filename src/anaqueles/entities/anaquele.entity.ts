import { Almacene } from "src/almacenes/entities/almacene.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Anaquele extends CommonEntity {
    @Column({
        type: 'character varying',
    length: 64,
    nullable: false, name: 'nombre'})
    nombre : string
    @Column({
        type: 'text',
    nullable: true,
    name : 'descripción',
    })
    description : string

    @ManyToMany(
        () => Almacene,
        (almacen) => almacen.anaquele,
        
      )
      almacene : Almacene[]
}
