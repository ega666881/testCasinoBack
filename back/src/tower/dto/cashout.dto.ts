import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CashoutDto {
    @ApiProperty()
    @IsNotEmpty()
    sessionId: string;
}