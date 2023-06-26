import { CommonEntity } from 'src/common/common.entity';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { RegistrarPartida } from 'src/registrar-partidas/entities/registrar-partida.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'raw_material' })
export class MateriasPrima extends CommonEntity {
  @Column({
    type: 'character varying',
    length: 64,
    nullable: false, name: 'name'
  })
  name: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: true,
    name: 'scaneId',
  })
  scaneId: string;

  @Column({
    type: 'text',
    nullable: true,
    name : 'description',
  })
  description: string;

  @ManyToMany(() => RegistrarPartida, (partida) => partida.materiasPrima)
  registarPartida: RegistrarPartida[];

  
}
