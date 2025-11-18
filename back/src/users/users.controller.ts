import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserBalanceDto } from './dto/updateUser.dto';
import { ValidateUserIdPipe } from './pipes/validate-user-id.pipe';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async getProfile(@Req() req) {
        return req.user;
    }

    @Patch('balance/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async updateBalance(
        @Req() req,
        @Body('updatedUserId', ValidateUserIdPipe) updatedUser: User,
        @Body() dto: UpdateUserBalanceDto,
    ) {
        if (!req.user.isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        return this.usersService.updateBalance(dto.updatedUserId, dto.amount);
    }


}
