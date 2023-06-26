import { CommonEntity } from 'src/common/common.entity';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { RegistrarPartida } from 'src/registrar-partidas/entities/registrar-partida.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'recepciones' })
export class Recepciones extends CommonEntity {
  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  folio: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  estadoDelPedido: boolean;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  fechaDeLlegada: Date;

  @OneToMany(() => RegistrarPartida, (partida) => partida.recepcion, {eager : true})
  registarPartida: RegistrarPartida[];
  
  @ManyToOne(()=>Inventario, (inventario)=> inventario.recepcione, )
   @JoinTable() inventario : Inventario;
}
