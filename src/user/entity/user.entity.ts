import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @BeforeInsert() emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert() firstNameToLowerCase() {
    this.firstName = this.firstName.toLowerCase();
  }

  @BeforeInsert() lastNameToLowerCase() {
    this.lastName = this.lastName.toLowerCase();
  }

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
