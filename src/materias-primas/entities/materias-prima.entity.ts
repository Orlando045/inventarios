import { CommonEntity } from 'src/common/common.entity';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { RegistrarPartida } from 'src/registrar-partidas/entities/registrar-partida.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'materias_primas' })
export class MateriasPrima extends CommonEntity {
  @Column({
    type: 'character varying',
    length: 64,
    nullable: false, name: 'nombre'
  })
  nombre: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: true,
    name: 'idEscaneo',
  })
  idScaneo: string;

  @Column({
    type: 'text',
    nullable: true,
    name : 'descripción',
  })
  descripcion: string;

  @ManyToMany(() => RegistrarPartida, (partida) => partida.materiasPrima)
  registarPartida: RegistrarPartida[];

  
}
