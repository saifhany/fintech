import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EXTRACT_JWT_TOKEN, JWT_ALGORITHM, JWT_SECRET, TOKEN_EXPIRATION } from 'src/auth/constants';
import { ExtractJwt } from 'passport-jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
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
  controllers: [UsersController],
  providers: [IsExist, IsNotExist, UsersService,JwtService,
    {
      provide: EXTRACT_JWT_TOKEN,
      useValue: ExtractJwt,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
