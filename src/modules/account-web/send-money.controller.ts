import {Controller, Get, Query, Inject} from "@nestjs/common";
import {SendMoneyUseCase, SendMoneyUseCaseSymbol} from "../../domains/ports/in/send-money.use-case";
import {SendMoneyCommand} from "../../domains/ports/in/send-money.command";
import {MoneyEntity} from "../../domains/entities/money.entity";

@Controller('/account/send')
export class SendMoneyController {
  constructor(
    @Inject(SendMoneyUseCaseSymbol) private readonly _sendMoneyUseCase: SendMoneyUseCase
  ) {}
  @Get('/')
  async sendMoney(
    @Query('sourceAccount') sourceAccountId: string,
    @Query('targetAccount') targetAccountId: string,
    @Query('amount') amount: number,
  ) {
    const command = new SendMoneyCommand(sourceAccountId, targetAccountId, MoneyEntity.of(amount));
    const result = await this._sendMoneyUseCase.sendMoney(command);
    return {result};
  }
}
