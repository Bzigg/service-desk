import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDataDto } from "./dto/updateUserData.dto";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { join } from "path";

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

	async getUserById(id: string) {
		const numericId = Number(id)
		if (Number.isNaN(numericId)) {
			return null
		}

		return await this.userRepository.findOne({
			where: { id: numericId }
		})
	}

	async updateUserById(data: UpdateUserDataDto): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: {
				id: data?.id
			}
		})

		if (!user) {
			return null
		}

		const { id, ...nextData } = data
		const profileFields = { ...nextData }
		delete (profileFields as { photo?: string }).photo
		user.set(profileFields)
		await user.save()

		return user
	}

	async updateUserPhoto(data: { id: number, photo: string }): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: {
				id: data?.id
			}
		})

		if (!user) {
			return null
		}

		const previousPhoto = user.photo
		user.set({ photo: data?.photo })
		await user.save()
		await this.removeUserPhoto(previousPhoto)

		return user
	}

	private async removeUserPhoto(photoPath?: string) {
		if (!photoPath || !photoPath.startsWith('/uploads/users/')) {
			return
		}

		const absolutePath = join(process.cwd(), photoPath.replace(/^\//, ''))
		if (!existsSync(absolutePath)) {
			return
		}

		try {
			await unlink(absolutePath)
		} catch {
			// Ignore file deletion errors, user data is already updated.
		}
	}
}
