import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/application/use-cases/create-user";
import { Money } from "src/domain/enterprise/value-objects/money";

@Controller('users')
export class CreateUserController {
    constructor(private createUser: CreateUserUseCase) {}

    @Post()
    async handler(
        @Body()
        body: {
            name: string;
            cpf: string;
            cnpj: string;
            email: string;
            password: string;
            type: 'common' | 'merchant';
            balance: number;
        },
    ) {
        const {
            name,
            cpf,
            cnpj,
            email,
            password,
            type,
            balance,
        } = body;

        await this.createUser.execute({
            name: name || null,
            cpf: cpf || null,
            cnpj: cnpj || null,
            email: email || null,
            password: password || null,
            type: type || null,
            balance: Money.create(balance),
        });
        }
    }
