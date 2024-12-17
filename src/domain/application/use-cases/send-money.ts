import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/either";
import { NotAllowedError } from "src/core/errors/not-allowed";
import { ResourceAlreadyExists } from "src/core/errors/resource-already-exists";
import { Transaction } from "src/domain/enterprise/entities/transaction";
import { UserRepository } from "../repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { Money } from "src/domain/enterprise/value-objects/money";
import { AuthorizationService } from "../repositories/authorization.repository";
import { NotificationService } from "../repositories/notification.repository";

export type SendMoneyUseCaseRequest = {
    senderId: string;
    receiverId: string;
    amount: number;
};

type SendMoneyUseCaseResponse = Either<ResourceAlreadyExists | NotAllowedError, { send : Transaction }>

@Injectable()
export class SendMoneyUseCase {
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository,
        private authorizationService: AuthorizationService,
        private notificationService: NotificationService
    ) {}

    async execute({
        senderId,
        receiverId,
        amount,
    }: SendMoneyUseCaseRequest): Promise<SendMoneyUseCaseResponse> {
        const sender = await this.userRepository.findById(senderId);
        const receiver = await this.userRepository.findById(receiverId);

        if (!sender || !receiver) {
            return left(new ResourceAlreadyExists());
        }

        if(!sender.canTransfer()) {
            return left(new NotAllowedError('Sender is not allowed to send money'));
        }

        const transferAmount = Money.create(amount);

        if (sender.balance.value < transferAmount.value) {
            return left(new NotAllowedError('Sender does not have enough balance'));
        }

        const isAuthorized = await this.authorizationService.authorize();

        if (!isAuthorized) {
            return left(new NotAllowedError('Transaction failed'));
        }

        try{
            sender.debit(transferAmount);
            receiver.credit(transferAmount);

            const transaction = Transaction.create({
                senderId: sender.id,
                receiverId: receiver.id,
                amount: transferAmount.value,
                createdAt: new Date(),
            });

            await this.userRepository.save(sender);
            await this.userRepository.save(receiver);
            await this.transactionRepository.create(transaction);

            await this.notificationService.notify(receiver._id.toString(), 'You received a new payment');

            return right({ send: transaction });
        } catch (err) {
            sender.credit(transferAmount);
            receiver.debit(transferAmount);
            await this.userRepository.save(sender);
            await this.userRepository.save(receiver);

            return left(new NotAllowedError('Transaction failed'));
        }
    }
}
        