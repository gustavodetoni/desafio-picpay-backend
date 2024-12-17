export abstract class NotificationService {
    abstract notify(userId: string, message: string): Promise<void>;
}