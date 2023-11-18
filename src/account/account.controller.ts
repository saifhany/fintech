import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
  Param,
} from '@nestjs/common';
import { ApiBadRequestResponse,  ApiCreatedResponse  , ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { JwtAuthGuard } from '../auth/guards/jwtAuthGuard';
import { AccountService } from './account.service';
import { createAccount } from './dto/create-account.dto';

@ApiTags("Accounts")
@Controller({
  path: "accounts",
  version: "1",
})
@ApiBearerAuth("authorization")
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @ApiOperation({
    summary: "open new account for user",
    description: "create new account for me",
  })
  @ApiOkResponse({
    description: "created successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet",
  })
  @Post() 
  @HttpCode(HttpStatus.CREATED)
  async createNewUserAccount(
    @Body() accountDto: createAccount, 
  ): Promise<unknown> {
    return this.service.createNewAccount(accountDto);
  }


  @ApiOperation({
    summary: "get my accounts",
    description: "get my accounts",
  })
  @ApiOkResponse({
    description: "get my accounts successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet",
  })
  @Get('myAccounts/:userId')
  @HttpCode(HttpStatus.OK)
  async getMyAccounts(@Param('userId') userId: number): Promise<unknown>{
  return this.service.getMyAccounts(userId);
  }


  @ApiOperation({
    summary: "update acccount details",
    description: "update acccount details fields",
  })
  @ApiOkResponse({
    description: "updated successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet",
  })
  @Patch("update-account-field/:accountId/:userId")
  @HttpCode(HttpStatus.OK)
  async updateAccountField(
    @Param("accountId") accountId: number,
    @Param("userId") userId: number,
    @Body() accountDto: createAccount,
  ): Promise<unknown> {
    return this.service.updateAccountField(accountId, userId, accountDto);
  }

  @ApiOperation({
    summary: "get currency of every country",
    description: "get currency of every country",
  })
  @ApiOkResponse({
    description: "updated successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet",
  })
  @Get('countries-currency')
  async getCountriesCurrency(): Promise<any> {
    const data = await this.service.getCountriesCurrency();
    return data;
  }

  
}
