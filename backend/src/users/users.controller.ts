import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto'
import { UsersService } from './users.service'

@Controller('/users')
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Post('/registration')
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto)
	}

	@Get()
	getUsers(@Body() userDto: CreateUserDto) {
		return [{id: 1}]
	}
}
