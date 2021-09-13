import {Global, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountOrmEntity} from "./account.orm-entity";
import {ActivityOrmEntity} from "./activity.orm-entity";
import {SendMoneyUseCaseSymbol} from "../../domains/ports/in/send-money.use-case";
import {AccountPersistenceAdapter} from "./account-persistence.adapter";
import {SendMoneyService} from "../../domains/services/send-money.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AccountOrmEntity, ActivityOrmEntity])
  ],
  providers: [
    AccountPersistenceModule,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (adapter) => {
        return new SendMoneyService(adapter, adapter)
      },
      inject: [AccountPersistenceAdapter]
    }
  ],
  exports: [SendMoneyUseCaseSymbol]
})
export class AccountPersistenceModule {

}
