import { Almacene } from "src/almacenes/entities/almacene.entity";
import { CommonEntity } from "src/common/common.entity";
import { MateriasPrima } from "src/materias-primas/entities/materias-prima.entity";
import { Recepciones } from "src/recepciones/entities/recepciones.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Inventario extends CommonEntity {
    @Column()
    description: string;

    @OneToMany(() => Recepciones, (recepcione) => recepcione.inventario,{ eager: true})
    
    @JoinTable()
    recepcione: Recepciones[];

    @ManyToOne(()=>Almacene, (almacene)=>almacene.invent, {eager : true})
    @JoinTable()almacene : Almacene[];
}
