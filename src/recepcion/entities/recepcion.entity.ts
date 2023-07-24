import { CommonEntity } from "src/common/common.entity";
import { RegisterOutput } from "src/register_outputs/entities/register_output.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'Recepcion' })
export class Recepcion extends CommonEntity {

  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  folio: string;

  @Column({
    // type: 'enum',
    nullable: true,
    default: 'Porhacer'
  })
  orderStatus: string;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  arrivalDate: Date;

  @OneToMany(() => RegisterOutput, (output) => output.recepcion, { eager: true })
  registerOut: RegisterOutput[];
}

// @Column({
  //   type: 'enum',
  //   enum: OrderStatusEnum,
  //   default: OrderStatusEnum.
  //     INICIALIZADO,
  //   nullable: true
  // })
  // orderStatus: OrderStatusEnum;