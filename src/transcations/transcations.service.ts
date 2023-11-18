import { AccountService } from './../account/account.service';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Transfer } from './entities/transcations.entity';
import { NullableType } from '../utils/types/nullable.type';
import { CreateTransferTransactionDto } from './dto/create-transfer-transactions.dto';
import { Account } from 'src/account/account.entity';

@Injectable()
export class TranscationsService {
  constructor(
    @InjectRepository(Transfer)
    private TransfersRepository: Repository<Transfer>,
    private usersService: UsersService,
    private accountService: AccountService,
  ) {}

 async create(dto: CreateTransferTransactionDto): Promise<any> {
    const {fromUserId, toUserId , fromAccountId ,toAccountId, type, description , amount} = dto
    const fromUser = fromUserId ? await this.usersService.findOne({ id: +fromUserId }) : null;
    const toUser = toUserId ? await this.usersService.findOne({ id: +toUserId }) : null;
    if(!fromUser){
        throw new Error("from user not found")
    }
    if(!toUser){
        throw new Error("to user not found")
    }
    const account =  await this.accountService.findOne({where: {id: fromAccountId!}})
    if (!account) {
        throw new Error("account not found")
    }
    if (Number(account?.accountBalance) < Number(amount)) {
        throw new Error("insufficient balance")
    }
    const withdrawFromSender = await this.withdraw(fromAccountId!,fromUserId!,amount!)
    const depositToReceiver = await this.deposit(toAccountId!,toUserId!,amount!)
    if(withdrawFromSender && depositToReceiver){
    return this.TransfersRepository.save(
      this.TransfersRepository.create(dto),
    );
    }
  }

  async withdraw(accountId:number,userId:number,amount:number) {
    const account =  await this.accountService.findOne({where: {id: accountId}})
    if (!account) {
        throw new Error("account not found")
    }
    if (Number(account?.accountBalance) < Number(amount)) {
        throw new Error("insufficient balance")
    }
    const newBalance = Number(account?.accountBalance) - Number(amount)
    return this.accountService.updateAccountBalance(accountId,userId,newBalance)
  }


  async deposit(accountId:number,userId:number,amount:number) {
    const account =  await this.accountService.findOne({where: {id: accountId}})
    if (!account) {
        throw new Error("account not found")
    }
    if (Number(account?.accountBalance) < Number(amount)) {
        throw new Error("insufficient balance")
    }
    const newBalance = Number(account?.accountBalance) + Number(amount)
    return this.accountService.updateAccountBalance(accountId,userId,newBalance)
  }

//   findManyWithPagination({
//     filterOptions,
//     sortOptions,
//     paginationOptions,
//   }: {
//     filterOptions?: FilterUserDto | null;
//     sortOptions?: SortUserDto[] | null;
//     paginationOptions: IPaginationOptions;
//   }): Promise<User[]> {
//     const where: FindOptionsWhere<User> = {};
//     if (filterOptions?.roles?.length) {
//       where.role = filterOptions.roles.map((role) => ({
//         id: role.id,
//       }));
//     }

//     return this.usersRepository.find({
//       skip: (paginationOptions.page - 1) * paginationOptions.limit,
//       take: paginationOptions.limit,
//       where: where,
//       order: sortOptions?.reduce(
//         (accumulator, sort) => ({
//           ...accumulator,
//           [sort.orderBy]: sort.order,
//         }),
//         {},
//       ),
//     });
//   }

//   findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
//     return this.usersRepository.findOne({
//       where: fields,
//     });
//   }

//   update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
//     return this.usersRepository.save(
//       this.usersRepository.create({
//         id,
//         ...payload,
//       }),
//     );
//   }

//   async softDelete(id: User['id']): Promise<void> {
//     await this.usersRepository.softDelete(id);
//   }
}
