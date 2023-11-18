import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { JwtLocalService } from './strategies/jwt-local.strategy';
import { UsersModule } from 'src/users/users.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { SessionModule } from 'src/session/session.module';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EXTRACT_JWT_TOKEN, JWT_ALGORITHM, JWT_SECRET, TOKEN_EXPIRATION } from './constants';
import { ExtractJwt } from 'passport-jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET) || JWT_SECRET,
        signOptions: {
          algorithm: JWT_ALGORITHM,
          expiresIn: configService.get<string>(TOKEN_EXPIRATION) || "1h",
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    IsExist,
    IsNotExist,
    AuthService,
    {
      provide: EXTRACT_JWT_TOKEN,
      useValue: ExtractJwt,
    },
  ],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
