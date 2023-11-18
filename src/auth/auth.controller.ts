import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse,  ApiCreatedResponse  , ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';

import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { User } from '../users/entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { Public } from './decorators/public-route';
import { Roles } from './decorators/roles.decorator';
import { RoleGuard } from './guards/role.guard';
import { JwtAuthGuard } from './guards/jwtAuthGuard';

@ApiTags("Authentication")
@Controller({
  path: "auth",
  version: "1",
})
@ApiBearerAuth("authorization")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    summary: "Login user by Account and Password",
    description: "Login user by Account and Password and return access token ",
  })
  @ApiOkResponse({
    description: "User Logged in successfully",
  })
  @ApiBadRequestResponse({
    description: "Validation error, Check the error message",
  })
  @ApiUnauthorizedResponse({
    description: "Account is not activated yet, please check your email",
  })

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDto);
  }

  
  @ApiOperation({
    summary: "Register user",
    description:
      "Register user account in our DB, however user is not verified",
  })
  @ApiCreatedResponse({
    description: "User created successfully",
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation error, Check the error message",
  })
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<LoginResponseType> {
    return this.service.register(createUserDto);
  }


  @ApiOperation({
    summary: "get my profile",
    description:
      "get my profile as signed user",
  })
  @ApiCreatedResponse({
    description: "get my profile as signed user successfully",
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation error, Check the error message",
  })
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Roles(['user'])
  @UseGuards(JwtAuthGuard,RoleGuard)
  public me(@Request() request:any): Promise<NullableType<User>> {
    return this.service.me(request);
  }



}
