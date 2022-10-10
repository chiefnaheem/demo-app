import { UserEntity } from 'src/user/entity/user.entity';
import { CurrencyEnum, StatusEnum } from 'src/wallet/enum/wallet.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @Column({ default: 0 })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  narration: string;

  @Column('uuid')
  transactionId: string;

  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;

  @Column({ type: 'enum', enum: CurrencyEnum, default: CurrencyEnum.NGN })
  currency: CurrencyEnum;

  @Column({ type: 'varchar', default: 'flutterwave' })
  paymentMethod: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  user: UserEntity;
}
