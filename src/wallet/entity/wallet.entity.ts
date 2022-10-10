import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('wallet')
export class WalletEntity {
  @Column({ default: 0 })
  balance: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currency: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ default: Date.now() })
  createdAt: Date;
}
