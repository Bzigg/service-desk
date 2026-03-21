import { Controller, Get, Query } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('/users')
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Get('/data')
	async getData(@Query() query: any): Promise<any> {
		const user = await this.usersService.getUserById(query.id)

		if (!user) {
			return user
		}

		const userData = typeof user.toJSON === 'function' ? user.toJSON() : user
		const { password, ...safeUser } = userData
		return safeUser
	}
}
