import { User as PrismaUser } from "@prisma/client";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { User } from "src/domain/enterprise/entities/user";
import { Money } from "src/domain/enterprise/value-objects/money";

export class PrismaUserMapper {
    static toDomain(raw: PrismaUser): User {
        return User.create({
            name: raw.name,
            cpf: raw.cpf,
            cnpj: raw.cnpj,
            email: raw.email,
            password: raw.password,
            type: raw.type as 'common' | 'merchant',
            balance: Money.create(raw.balance),
            createdAt: raw.createdAt as Date,
            updatedAt: raw.updatedAt,
            },
            new UniqueEntityID(raw.id)
        );
    }

    static toPrisma(user: User): PrismaUser {
        return {
            id: user.id.toString(),
            name: user.name,
            cpf: user.cpf,
            cnpj: user.cnpj,
            email: user.email,
            password: user.password,
            type: user.type,
            balance: user.balance.value,
            createdAt: user.createdAt || new Date(),
            updatedAt: user.updatedAt || null,
        }
    }

}