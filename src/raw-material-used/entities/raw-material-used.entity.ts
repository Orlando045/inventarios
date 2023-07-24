import { CommonEntity } from "src/common/common.entity";
import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Column, Entity, JoinTable, OneToMany } from "typeorm";

@Entity()
export class RawMaterialUsed extends CommonEntity{

    @Column({
        nullable: true,
    })
    folio: string;

    @Column({
        nullable: true,
        type: 'numeric'
    })
    amount: number;

    @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
    idpackage: string;

    @OneToMany(() => RawMaterial, (rawM) => rawM.used, { eager: true })
    @JoinTable()
    rawM: RawMaterial[];
}
