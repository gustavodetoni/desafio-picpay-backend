import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/either";
import { ResourceAlreadyExists } from "src/core/errors/resource-already-exists";
import { User } from "src/domain/enterprise/entities/user";
import { UserRepository } from "../repositories/user.repository";
import { Money } from "src/domain/enterprise/value-objects/money";

export type CreateUserUseCaseRequest = {
    name: string;
    cpf?: string;
    cnpj?: string;
    email: string;
    password: string;
    type: 'common' | 'merchant';
    balance: Money;
}

type CreateUserUseCaseResponse = Either<ResourceAlreadyExists, { user: User }>

@Injectable()
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({
        name,
        cpf,
        cnpj,
        email,
        password,
        type,
        balance
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            return left(new ResourceAlreadyExists());
        }

        if (cpf) {
            const userWithSameCpf = await this.userRepository.findByCpf(cpf);
            if (userWithSameCpf) {
                return left(new ResourceAlreadyExists());
            }
        }

        if (cnpj) {
            const userWithSameCnpj = await this.userRepository.findByCnpj(cnpj);
            if (userWithSameCnpj) {
                return left(new ResourceAlreadyExists());
            }
        }

        const user = User.create({
            name,
            cpf,
            cnpj,
            email,
            password,
            type,
            balance: Money.create(0),
        });

        await this.userRepository.create(user);

        return right({ user });
    }
}