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
}
