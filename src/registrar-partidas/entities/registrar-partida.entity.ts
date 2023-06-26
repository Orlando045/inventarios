import { isString } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { MateriasPrima } from 'src/materias-primas/entities/materias-prima.entity';
import { Recepciones } from 'src/recepciones/entities/recepciones.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'registrar_partida' })
export class RegistrarPartida extends CommonEntity {
  @ManyToMany(
    () => MateriasPrima,
    (materiaPrima) => materiaPrima.registarPartida,
    {
      eager: true,
    },
  )

  @JoinTable()
  materiasPrima: MateriasPrima[];

  @Column({
    type: 'numeric',
    nullable: false,
    name: 'Cantidad'
  })
  cantidad: number;

  @ManyToOne(() => Recepciones, (recepcion) => recepcion.registarPartida, {cascade : true})
  recepcion: Recepciones;
}
