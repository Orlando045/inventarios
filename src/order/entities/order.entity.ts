import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CommonEntity } from "src/common/common.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Order extends CommonEntity {
    @Column({
        type: 'character varying',
        length: 64,
        nullable: false,
      })
      folio: string;
      @Column({
        type: 'numeric',
        nullable: false,
      })
      amount: number ;

      @ManyToMany(() => Product, product => product.orders, {eager: true})
      @JoinTable()
  product: Product[];
}
