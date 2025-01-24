import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from 'src/domain/application/use-cases/create-user';
import { TransferMoneyController } from './controllers/transfer-money.controller';
import { SendMoneyUseCase } from '@/domain/application/use-cases/send-money';
import { AuthorizationService } from '@/domain/application/repositories/authorization.repository';
import { HttpAuthorizationService } from './services/http-authorization.service';
import { HttpNotificationService } from './services/http-notification.service';
import { NotificationService } from '@/domain/application/repositories/notification.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, TransferMoneyController],
  providers: [
    CreateUserUseCase,
    SendMoneyUseCase,
    {
      provide: AuthorizationService,
      useClass: HttpAuthorizationService,
    },
    {
      provide: NotificationService,
      useClass: HttpNotificationService,
    },
  ],
})
export class HttpModule {}
