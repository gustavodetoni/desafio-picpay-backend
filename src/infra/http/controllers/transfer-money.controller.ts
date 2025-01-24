import { SendMoneyUseCase } from '@/domain/application/use-cases/send-money';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('/transactions')
export class TransferMoneyController {
  constructor(private transferMoney: SendMoneyUseCase) { }

  @Post()
  async handle(@Body() body: any) {
    const result = await this.transferMoney.execute({
      senderId: body.senderId,
      receiverId: body.recipientId,
      amount: body.amount,
    });

    if (result.isLeft()) {
      throw new Error(result.value.message);
    }

    return {
      transaction: {
        id: result.value.send.id.toString(),
        amount: result.value.send.amount.toString(),
        createdAt: result.value.send.createdAt,
      },
    };
  }
}
