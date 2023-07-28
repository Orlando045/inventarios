import { hash } from "bcrypt";
import { CommonEntity } from "src/common/common.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User extends CommonEntity {
  @Column({
    type: 'character varying',
    length: 255,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'character varying',
    length: 128,
    nullable: false,
    select: false,
  })
  password: string;

  @ManyToMany(() => Profile)
  @JoinTable({ name: 'user_profile' })
  profiles: Profile[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  checkEmail() {
    this.username = this.username.toLowerCase().trim();
  }
}

