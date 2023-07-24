
import { CommonEntity } from "src/common/common.entity";
import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Recepcion } from "src/recepcion/entities/recepcion.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";


@Entity({ name: 'register_Output' })
export class RegisterOutput extends CommonEntity {
  @Column({
    type: 'numeric',
    nullable: false,
  })
  amount: number;
  @ManyToMany(() => RawMaterial, (rawMaterial) => rawMaterial.registerOutput, { eager: true })
  @JoinTable()
  rawMaterial: RawMaterial[];
  @ManyToOne(() => Recepcion, (recepcion) => recepcion.registerOut)
  recepcion: Recepcion;
}
