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

    get value(): number {
        return this.props.amount;
    }

    public add(money: Money): Money {
        return Money.create(this.value + money.value);
    }

    public subtract(money: Money): Money {
        return Money.create(this.value - money.value);
    }

    static create(amount: number): Money {
        if (amount < 0) {
            throw new Error('Money amount cannot be negative');
        }
        return new Money({ amount, currency: Money.CURRENCY });
    }
}