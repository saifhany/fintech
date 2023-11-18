import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AccountDto } from "./dto";
import { UsersService } from "src/users/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "./account.entity";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { createAccount } from "./dto/create-account.dto";
import { NullableType } from "src/utils/types/nullable.type";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class AccountService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private readonly httpService: HttpService
  ) {}

  async createNewAccount(dto: createAccount): Promise<unknown> {
    const user = await this.userService.findOne({ id: dto.userId });
    if(user){
      const account =  this.accountsRepository.create({
        ...dto,
        user,
      });
      await this.accountsRepository.save(account);
      return account;
    }
  }

  async getMyAccounts(userId: number): Promise<unknown> {
    const user = await this.findAll({ where: { user: { id: userId } } });
    return user;
  }

    findAll(options: FindOneOptions<Account> = {} ): Promise<NullableType<Account[]>> {
   return   this.accountsRepository.find(options)
  }


  findOne(options: FindOneOptions<Account> = {} ): Promise<NullableType<Account>> {
      return   this.accountsRepository.findOne(options)
    }

  async updateAccountField(
    id: number,
    userId: number,
    dto: Partial<AccountDto>,
  ): Promise<unknown> {
    const account = await this.accountsRepository.findOne({where: {id , user: {id: userId}}});
    if (!account) {
      throw new NotFoundException(`account with id ${id} not found`);
    }
    account.accountAddress = dto.accountAddress || account.accountAddress;
    account.accountBalance = dto.accountBalance || account.accountBalance;
    account.accountBank = dto.accountBank || account.accountBank;
    account.accountBranch = dto.accountBranch || account.accountBranch;
    account.accountCity = dto.accountCity || account.accountCity;
    account.accountCountry = dto.accountCountry || account.accountCountry;
    account.accountCurrency = dto.accountCurrency || account.accountCurrency;
    account.accountDescription =
      dto.accountDescription || account.accountDescription;
    account.accountEmail = dto.accountEmail || account.accountEmail;
    account.accountLogo = dto.accountLogo || account.accountLogo;
    account.accountName = dto.accountName || account.accountName;
    account.accountNumber = dto.accountNumber || account.accountNumber;
    account.accountPhone = dto.accountPhone || account.accountPhone;
    account.accountStatus = dto.accountStatus || account.accountStatus;
    account.accountType = dto.accountType || account.accountType;
    account.accountUpdatedAt = Date.now().toString();
    account.accountWebsite = dto.accountWebsite || account.accountWebsite;
    

    await this.accountsRepository.save(account);
    return account;
  }


  async updateAccountBalance(
    id: number,
    userId: number,
    amount:number  
): Promise<unknown> {
    const account = await this.accountsRepository.findOne({where: {id , user: {id: userId}}});
    if (!account) {
      throw new NotFoundException(`account with id ${id} not found`);
    }
    account.accountBalance = amount;
    await this.accountsRepository.save(account);
    return account;
  }
    
    
  async getCountriesCurrency(): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://countriesnow.space/api/v0.1/countries/currency`, { timeout: 5000 }).pipe(
          map((res) => res.data),
        ),
      );
      return response;
    } catch (error) {
      console.error('Error fetching currency:', error.message);
      throw new Error('Failed to fetch currency');
    }
  }

}
