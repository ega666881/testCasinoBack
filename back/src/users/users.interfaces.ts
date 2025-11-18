
import { Types } from "mongoose";
import { User } from "./schemas/user.schema";

export interface IFullUser extends User {
    _id?: Types.ObjectId
} 

export type UserWithoutPassword = Omit<IFullUser, 'password'>;