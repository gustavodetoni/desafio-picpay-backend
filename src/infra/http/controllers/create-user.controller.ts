import { Body, ConflictException, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/application/use-cases/create-user";
import { Money } from "src/domain/enterprise/value-objects/money";
import { UserPresenter } from "../presenters/user.presenter";
import { ResourceAlreadyExists } from "src/core/errors/resource-already-exists";

@Controller('/users')
export class CreateUserController {
    constructor(private createUser: CreateUserUseCase) { }

    @Post()
    async handler(@Body() body: any) {
        const result = await this.createUser.execute({
            name: body.name,
            cpf: body.cpf,
            cnpj: body.cnpj,
            email: body.email,
            password: body.password,
            type: body.type,
            balance: Money.create(body.balance),
        });

        if (result.isLeft()) {
            const error = result.value;

            if (error instanceof ResourceAlreadyExists) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException('An unexpected error occurred');
        }
        return {
            user: UserPresenter.toHttp(result.value.user),
        };
    }
}


