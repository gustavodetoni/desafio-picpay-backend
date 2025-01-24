import { Injectable } from '@nestjs/common';
import { NotificationService } from '@/domain/application/repositories/notification.repository';

@Injectable()
export class HttpNotificationService implements NotificationService {
  async notify(userId: string, message: string): Promise<void> {
    console.log(`Notification sent to user ${userId}: ${message}`);
  }
}
