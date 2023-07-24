import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column(
        {
           
            nullable: true,
            select: false
        }
    )
    password: string;

    @Column(
        {
            nullable: true,
            type: 'text'
        }
    )
    fullName: string;

    @Column(
        {
            type: 'text',
            nullable: true
        }
    )
    username: string;

    @Column(
        {
            default: true,
            nullable: true
        }
    )

    @Column(
        {
            nullable: true
        }
    )
    isActive: boolean;

    @Column(
        {
            nullable: true,
            default: 'Almacenista',
        }
    )
    role: string;
}
