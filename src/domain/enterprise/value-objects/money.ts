import { ResourceAlreadyExists } from "@/core/errors/resource-already-exists";
import { ValueObject } from "src/core/entities/value-object";

interface MoneyProps {
    amount: number;
    currency: string;
}

export class Money extends ValueObject<MoneyProps> {
    public static readonly CURRENCY = 'BRL';

    private constructor(props: MoneyProps) {
        super(props);
    }

    get value(): any {
        return this.props.amount;
    }

    public add(money: Money): Money {
        return Money.create(this.value + money.value);
    }

    public subtract(money: Money): Money {
        return Money.create(this.value - money.value);
    }

    static create(amount: any): Money {
        if (amount < 0) {
            throw new ResourceAlreadyExists('Money amount cannot be negative');
        }
        return new Money({ amount, currency: Money.CURRENCY });
    }
}