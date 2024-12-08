import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

export interface TransactionProps {
    senderId: UniqueEntityID;
    receiverId: UniqueEntityID;
    amount: number;
    createdAt: Date;
}

export class Transaction extends Entity<TransactionProps> {
    get senderId() {
        return this.props.senderId;
    }
    
    get receiverId() {
        return this.props.receiverId;
    }

    get amount() {
        return this.props.amount;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props: TransactionProps, id?: UniqueEntityID) {
        return new Transaction(props, id);
    }
}