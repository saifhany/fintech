import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AccountDto {
  @ApiProperty({ example: 'Savings Account' })
  @IsNotEmpty()
  @IsString()
  accountName: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiProperty({ example: 'Savings' })
  @IsOptional()
  @IsString()
  accountType?: string;

  @ApiProperty({ example: 1000.00 })
  @IsOptional()
  accountBalance?: number;

  @ApiProperty({ example: 'active', enum: ['active', 'inactive', 'dormant', 'closed'] })
  @IsOptional()
  @IsString()
  accountStatus: string | null;

  @ApiProperty({ example: 'USD' })
  @IsOptional()
  @IsString()
  accountCurrency: string | null;

  @ApiProperty({ example: 'MyBank' })
  @IsOptional()
  @IsString()
  accountBank: string | null;

  @ApiProperty({ example: 'Main Branch' })
  @IsOptional()
  @IsString()
  accountBranch: string | null;

  @ApiProperty({ example: '123 Main St, City' })
  @IsOptional()
  @IsString()
  accountAddress: string | null;

  @ApiProperty({ example: 'Cairo' })
  @IsOptional()
  @IsString()
  accountCity: string | null;

  @ApiProperty({ example: 'Egypt' })
  @IsOptional()
  @IsString()
  accountCountry: string | null;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  accountPhone: string | null;

  @ApiProperty({ example: 'user@example.com' })
  @IsOptional()
  @IsString()
  accountEmail: string | null;

  @ApiProperty({ example: 'www.example.com' })
  @IsOptional()
  @IsString()
  accountWebsite: string | null;

  @ApiProperty({ example: 'Additional account details.' })
  @IsOptional()
  @IsString()
  accountDescription: string | null;

  @ApiProperty({ example: 'path/to/logo.png' })
  @IsOptional()
  @IsString()
  accountLogo: string | null;

  @ApiProperty({ type: () => Number })
  @IsNotEmpty()
  userId: number; // Assuming this is the ID of the associated user
}