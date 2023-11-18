import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MinLength,
    Validate,
} from 'class-validator';

export class depositWithdrawTransactionDto {

   

    @ApiProperty({ example: 12 })
    @IsNotEmpty()
    accountId: number | null;

    @ApiProperty({ example: 12 })
    @IsNotEmpty()
    userId: number | null;

    @ApiProperty({ example: 12 })
    @IsNotEmpty()
    amount: number | null;


}
