import { User } from "src/domain/enterprise/entities/user";

export class UserPresenter {
    static toHttp(user: User) {
        return {
            id: user.id.toString(),
            name: user.name,
            cpf: user.cpf,
            cnpj: user.cnpj,
            email: user.email,
            password: user.password,
            type: user.type,
            balance: user.balance.value,
        };
    }
}