import { Model } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {

    private users: User[] = [];


    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async createUser(username: string, password: string, fullName: string) {
        if (!password || !username || !fullName) {
            throw new BadRequestException('Request Error, Server could not understand the request due to invalid syntax.')
        }
        const newUser = new this.userModel({
            username,
            password,
            fullName
        })
        return await newUser.save()
    }

    async updateUser(id: string, username: string, fullName: string) {
        const user = await this.findUser(id);

        const newUser: { [k: string]: any } = {};

        if (username && username != "") {
            newUser.username = username
        }

        if (fullName && fullName != "") {
            newUser.fullName = fullName
        }

        await user.updateOne(newUser)
        return this.findUser(id);
    }

    async deleteById(id: string): Promise<any> {
        await this.userModel.findByIdAndDelete(id)
        return {
            status: 200,
            message: "Delete successfully"
        };
    }

    async findUser(id: string): Promise<User> {
        const user = this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('Could not found data');
        } else return user;
    }
}