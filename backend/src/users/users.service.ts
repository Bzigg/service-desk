import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UsersService {

	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async createUser (dto: CreateUserDto) {
		return await this.userRepository.create(dto)
	}

	async getUserByEmail(email: string) {
		const where = {
			email: email
		}

		return await this.userRepository.findOne({
			where: where
		})
	}

	async getUserById(id: number) {
		const where = {
			id: id
		}

		return await this.userRepository.findOne({
			where: where
		})
	}

	async updateUserById(data: any) {
		const user = await this.userRepository.findOne({
			where: {
				id: data?.id
			}
		})

		if (!user) {
			return null
		}

		const { id, password, createdAt, updatedAt, ...nextData } = data
		user.set(nextData)
		await user.save()

		return user
	}
}
