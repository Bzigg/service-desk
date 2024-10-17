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
		return await this.userRepository.findOne({
			where: {
				email: email
			}
		} as any)
	}

	async getUserById(id: number) {
		return await this.userRepository.findOne({
			where: {
				id: id
			}
		} as any)
	}
}
