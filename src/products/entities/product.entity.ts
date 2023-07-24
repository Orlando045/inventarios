import { CommonEntity } from "src/common/common.entity";
import { LoteOfProduct } from "src/lote-of-products/entities/lote-of-product.entity";
import { ManufactureOrder } from "src/manufacture-order/entities/manufacture-order.entity";
import { Order } from "src/order/entities/order.entity";
import { Recipe } from "src/recipe/entities/recipe.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'Product' })
export class Product extends CommonEntity{
@Column({
    nullable: true,
})
name: string;

@Column({
    nullable: true,
    default: 'Porhacer',
  })
  orderStatus: string;

  @ManyToMany(() => Order, order => order.product,)
  orders: Order[];

  @OneToMany(() => Recipe, recipes => recipes.product, {eager: true})
  recipe: Recipe[];
  
  @ManyToMany(() => ManufactureOrder, (manufactureOrder) => manufactureOrder.products,{cascade: true})
  manufactureOrder: ManufactureOrder[];

  @ManyToMany(()=> LoteOfProduct, (lote)=> lote.produ, {cascade: true})
  loteOfProduct: LoteOfProduct[];
}