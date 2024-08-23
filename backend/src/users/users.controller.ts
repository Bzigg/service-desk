import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { UsersService } from './users.service'

enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

@Controller('/users')
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Post('/registration')
	create(@Body() { role, ...user}) {
		const userDto = {
			...user,
			isUser: role === UserRole.USER,
			isAdmin: role === UserRole.ADMIN,
		} as CreateUserDto

		return this.usersService.createUser(userDto)
	}
}
