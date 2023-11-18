import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MinLength,
    Validate,
} from 'class-validator';

export class CreateTransferTransactionDto {

    @ApiProperty({ example: 12 })
    @IsNotEmpty()
    fromUserId: number | null;


    @ApiProperty({ example: 12 })
    @IsNotEmpty()
    fromAccountId: number | null;

    @ApiProperty({ example: 12 })
    @IsNotEmpty()
    toUserId: number | null;

    @ApiProperty({ example: 12 })
    @IsNotEmpty()
    toAccountId: number | null;

    @ApiProperty({ example: 500 })
    @IsNotEmpty()
    amount: number | null;

    @ApiProperty({ example: "transfer" })
    @IsNotEmpty()   
    type: string | null;


    @ApiProperty({ example: "transfer" })
    @IsNotEmpty()
    description: string | null;



}
