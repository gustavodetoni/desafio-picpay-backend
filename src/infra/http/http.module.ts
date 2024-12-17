import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from 'src/domain/application/use-cases/create-user';
import { TransferMoneyController } from './controllers/transfer-money.controller';
import { SendMoneyUseCase } from '@/domain/application/use-cases/send-money';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, TransferMoneyController],
  providers: [CreateUserUseCase, SendMoneyUseCase],
})
export class HttpModule {}
