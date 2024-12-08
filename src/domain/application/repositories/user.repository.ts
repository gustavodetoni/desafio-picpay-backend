import { User } from "../../enterprise/entities/user";

export abstract class UserRepository {
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByCpf(cpf: string): Promise<User | null>;
    abstract findByCnpj(cnpj: string): Promise<User | null>;
    abstract create(user: User): Promise<void>;
    abstract save(user: User): Promise<void>;
}