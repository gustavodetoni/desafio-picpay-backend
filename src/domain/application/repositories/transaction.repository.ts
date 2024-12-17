import { Transaction } from "src/domain/enterprise/entities/transaction";

export abstract class TransactionRepository {
    abstract create(transaction: Transaction): Promise<void>;
}