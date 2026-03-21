import { Body, Controller, Get, Put, Query } from '@nestjs/common'
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

		const userData = user?.toJSON()
		const { password, ...safeUser } = userData
		return safeUser
	}

	@Put('/data')
	async updateData(@Body() data: any): Promise<any> {
		const user = await this.usersService.updateUserById(data)

		if (!user) {
			return user
		}

		const userData = user?.toJSON()
		const { password, ...safeUser } = userData
		return safeUser
	}
}
