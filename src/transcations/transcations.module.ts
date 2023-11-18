import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscationsService } from './transcations.service';
import { TranscationsController } from './transcations.controller';
import { Transfer } from './entities/transcations.entity';
import { AccountModule } from 'src/account/account.module';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer]),
    AccountModule,
    UsersModule,
  ],
  controllers: [TranscationsController],
  providers: [TranscationsService, JwtService,

  ],
})
export class TranscationsModule { }
