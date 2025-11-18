import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { TowerService } from './tower.service';
import { Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ValidateTowerIdPipe } from './pipes/validate-tower-id.pipe';
import { TowerSession } from './schemas/tower.schema';

import { CashoutDto } from './dto/cashout.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tower')
export class TowerController {
    constructor(
        private readonly towerService: TowerService
    ) {}

    @Post('start')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async start(@Req() req) {
        return this.towerService.startGame(req.user.id);
    }

    @Post('choose-door')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async choose(
        @Req() req,

    ) {
        return this.towerService.chooseDoor(req.user.id);
    }

    @Post('cashout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    async cashout(
        @Req() req, 
    ) {
        return this.towerService.cashout(req.user.id);
    }

}
