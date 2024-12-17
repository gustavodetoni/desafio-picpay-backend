import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/application/repositories/user.repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { TransactionRepository } from "@/domain/application/repositories/transaction.repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: TransactionRepository,
            useClass: PrismaUserRepository
        }
    ],
    exports: [UserRepository, TransactionRepository]
})
export class DatabaseModule {} 