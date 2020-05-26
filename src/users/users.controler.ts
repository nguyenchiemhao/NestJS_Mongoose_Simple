import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.services';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) {
    }

    @Get()
    async getAllUser(): Promise<any> {
        return await this.userService.findAll();
    }

    @Post()
    async createUser(@Body() data): Promise<any> {
        return this.userService.createUser(data.username, data.password, data.fullName)
    }

    @Patch(':id')
    async updateUser(@Param() param, @Body() data): Promise<any> {
        return this.userService.updateUser(param.id, data.username, data.fullName)
    }

    @Delete(':id')
    async deteleUser(@Param() param): Promise<any> {
        return this.userService.deleteById(param.id)
    }
}