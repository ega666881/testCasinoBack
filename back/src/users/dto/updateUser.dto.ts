import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateUserBalanceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    updatedUserId: string
}