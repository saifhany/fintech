import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { CreateTransferTransactionDto } from './dto/create-transfer-transactions.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { Transfer } from './entities/transcations.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { TranscationsService } from './transcations.service';
import { depositWithdrawTransactionDto } from './dto/deposit-withdraw-transaction.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwtAuthGuard';

@ApiTags('transcations')
@Controller({
  path: 'transcations',
  version: '1',
})
export class TranscationsController {
  constructor(private readonly transcationsService: TranscationsService) {}


  @ApiOperation({
    summary: "transfer amount from account to another account",
    description: "transfer amount from account to another account",
  })
  @ApiOkResponse({
    description: " transfer successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet",
  })
  @Post('transfer')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTransferTransactionDto): Promise<Transfer> {
    return this.transcationsService.create(dto);
  }

  
  @ApiOperation({
    summary: "deposit amount to specific account",
    description: "deposit amount to specific account",
  })
  @ApiOkResponse({
    description: " deposit transcation  done successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet",
  })
  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  deposit(@Body() dto: depositWithdrawTransactionDto): Promise<any> {
    return this.transcationsService.deposit(dto.accountId!,dto.userId!,dto.amount!);
  }

  
  @ApiOperation({
    summary: "withdraw amount from specific account",
    description: "withdraw amount from specific account",
  })
  @ApiOkResponse({
    description: "withdraw successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet",
  })
  @Post('withdraw')
  @HttpCode(HttpStatus.CREATED)
  withdraw(@Body() dto: depositWithdrawTransactionDto): Promise<any> {
    return this.transcationsService.withdraw(dto.accountId!,dto.userId!,dto.amount!);
  }


  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async findAll(
  //   @Query() query: QueryUserDto,
  // ): Promise<InfinityPaginationResultType<User>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.usersService.findManyWithPagination({
  //       filterOptions: query?.filters,
  //       sortOptions: query?.sort,
  //       paginationOptions: {
  //         page,
  //         limit,
  //       },
  //     }),
  //     { page, limit },
  //   );
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<User>> {
  //   return this.usersService.findOne({ id: +id });
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Patch(':id')
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Param('id') id: number,
  //   @Body() updateProfileDto: UpdateUserDto,
  // ): Promise<User> {
  //   return this.usersService.update(id, updateProfileDto);
  // }


}
