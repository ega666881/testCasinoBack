import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/users/users.repository';
import * as dotenv from 'dotenv-ts'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access-token') {
    constructor(
        private usersRepository: UsersRepository
        ) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: process.env.JWT_SECRET || 'secret',
            });
        }

    async validate(payload: any) {
        const user = await this.usersRepository.findById(payload.userId);
        
        return user
    }
}