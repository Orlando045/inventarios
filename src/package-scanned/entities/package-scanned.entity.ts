import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class PackageScanned extends CommonEntity {

    @Column()
    identificationPackage : string;

    @Column()
    amount: number;
}
