import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { StatusEnum, CurrencyEnum } from '../enum/wallet.enum';

@Entity('wallet-transaction')
export class WalletTransactionEntity {
  @Column({ default: 0 })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column()
  isInFlow: boolean;

  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;

  @Column({ type: 'enum', enum: CurrencyEnum, default: CurrencyEnum.NGN })
  currency: CurrencyEnum;

  @Column({ type: 'varchar', default: 'flutterwave' })
  paymentMethod: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
