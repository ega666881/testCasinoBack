import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(insertData: User) {
        try {
            const user = new this.userModel(insertData)
            await user.save()
            return user.toObject()
        }
        
        catch (error) {
            switch (error.code) {
                case 11000: {
                    const dublField = Object.keys(error.keyPattern)[0]
                    throw new HttpException(
                        `Пользователь с таким ${dublField} уже сужествует`,
                        HttpStatus.CONFLICT
                    )
                }
                default: {
                    throw new HttpException(
                        `Ошибка при создании пользователя`,
                        HttpStatus.INTERNAL_SERVER_ERROR
                    )
                }
            }
        }
    }

    async findByEmail(email: string) {
        const user = await this.userModel.findOne({ email }).select('+password')
        return user?.toObject()
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }
 
    async updateBalance(userId: string, amount: number) {
        return this.userModel.findByIdAndUpdate(
            userId,
            { $inc: { balance: amount } },
            { new: true }
        );
      }
}
