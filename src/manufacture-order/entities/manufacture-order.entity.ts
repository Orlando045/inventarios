import { CommonEntity } from "src/common/common.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
@Entity()
export class ManufactureOrder extends CommonEntity{
    @Column({
        type: 'numeric',
        nullable: false,
    })
    amount: number;

    @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
    idpackage: string;

    @ManyToMany(() => Product, (product) => product.manufactureOrder, { eager: true })
    @JoinTable()
    products: Product[];

    @Column({
        nullable: true,
        default: 'Porhacer',
      })
      orderStatus: string;
}
