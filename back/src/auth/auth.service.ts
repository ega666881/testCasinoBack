import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/schemas/user.schema';
import { UserWithoutPassword } from 'src/users/users.interfaces';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}

    

    async register(dto: RegisterDto): Promise<UserWithoutPassword | HttpException> {
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        const { password, ...userWithoutPassword } = await this.usersRepository.create({
            ...dto,
            password: hashedPassword,
            balance: 0,
            isAdmin: false 
        })
        return userWithoutPassword
    }

    async validateUser(email: string, pass: string): Promise<UserWithoutPassword | null> {
        const user = await this.usersRepository.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto.email, dto.password);
        if (!user) throw new Error('Invalid credentials');

        return {
            access_token: this.jwtService.sign({ email: user.email, userId: user._id }, ),
            user,
        };
    }
}
