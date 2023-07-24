import { Column, Entity } from "typeorm";

@Entity('pefiles')
export class Perfil {

    @Column()
    admin: string;

    @Column()
    receptionist: string; 

    @Column()
    storer: string;

}
