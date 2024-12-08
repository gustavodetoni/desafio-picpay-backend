import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/optional";
import { Money } from "../value-objects/money";

export type UserProps = {
    name: string;
    cpf?: string;
    cnpj?: string;
    email: string;
    password: string;
    type: 'common' | 'merchant';
    balance: Money;
    createdAt?: Date;
    updatedAt?: Date | null;
};

export class User extends Entity<UserProps> {
    get name() {
        return this.props.name;
    }

    get cpf() {
        return this.props.cpf;
    }
    
    get cpnj() {
        return this.props.cnpj;
    }
    
    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }

    get balance(){
        return this.props.balance;
    }

    get type() {
        return this.props.type;
    }

    public canTransfer(): boolean {
        return this.type === 'common';
    }

    public debit(amount: Money) : void {
        if (this.balance.value < amount.value) {
            throw new Error('Saldo insuficiente');
        }
        this.props.balance = this.balance.subtract(amount);
    }

    public credit(amount: Money) : void {
        this.props.balance = this.balance.add(amount);
    }

    public static create(
        props: Optional<UserProps, 'createdAt'>,
         id?: UniqueEntityID
    ) {
        const user = new User({
            ...props,
            balance: props.balance ?? Money.create(0),
            createdAt: new Date(),
        },
        id,
    );

    return user;
    }
}