import { Anaquele } from "src/anaqueles/entities/anaquele.entity";
import { CommonEntity } from "src/common/common.entity";
import { Inventario } from "src/inventario/entities/inventario.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, } from "typeorm";

@Entity()
export class Almacene extends CommonEntity {

    @Column()
    nombre : string;

    @Column()
    description : string; 

    @ManyToMany(() => Anaquele, (anaquel) => anaquel.almacene, {eager: true},
      )
      @JoinTable()
      anaquele : Anaquele[];

      @ManyToOne( ()=>Inventario, (inventario)=> inventario.almacene)
      @JoinTable()
     invent : Inventario;
}
