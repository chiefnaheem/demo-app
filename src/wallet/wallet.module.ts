import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from './controller/wallet.controller';
import { WalletEntity } from './entity/wallet.entity';
import { WalletTransactionEntity } from './entity/walletTransaction.entity';
import { WalletService } from './service/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, WalletTransactionEntity])],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
