import { BadRequestException, Body, Controller, Get, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage, FileFilterCallback } from 'multer'
import { extname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { UsersService } from './users.service'
import { User } from './users.model'

type UserDataQuery = {
	id: string
}

type UpdateUserDataBody = {
	id: number
	email?: string
	firstName?: string
	lastName?: string
	surname?: string
	photo?: string
}

type UpdateUserPhotoBody = {
	id: string
}

type SafeUser = Omit<ReturnType<User['toJSON']>, 'password'>

@Controller('/users')
export class UsersController {

	constructor(private usersService: UsersService) {}

	private sanitizeUser(user: User): SafeUser {
		const userData = user.toJSON()
		const { password, ...safeUser } = userData
		return safeUser
	}

	@Get('/data')
	async getData(@Query() query: UserDataQuery): Promise<SafeUser | null> {
		const user = await this.usersService.getUserById(query.id)

		if (!user) {
			return user
		}

		return this.sanitizeUser(user)
	}

	@Put('/data')
	async updateData(@Body() data: UpdateUserDataBody): Promise<SafeUser | null> {
		const user = await this.usersService.updateUserById(data)

		if (!user) {
			return user
		}

		return this.sanitizeUser(user)
	}

	@Put('/photo')
	@UseInterceptors(FileInterceptor('photo', {
		limits: {
			fileSize: 5 * 1024 * 1024
		},
		fileFilter: (_req, file, cb: FileFilterCallback) => {
			const allowedMimeTypes = ['image/jpeg', 'image/png']
			const extension = extname(file.originalname).toLowerCase()
			const allowedExtensions = ['.jpg', '.jpeg', '.png']
			if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(extension)) {
				return cb(new BadRequestException('Only jpg and png files are allowed'))
			}
			cb(null, true)
		},
		storage: diskStorage({
			destination: (_req, _file, cb) => {
				const uploadPath = join(process.cwd(), 'uploads', 'users')
				if (!existsSync(uploadPath)) {
					mkdirSync(uploadPath, { recursive: true })
				}
				cb(null, uploadPath)
			},
			filename: (_req, file, cb) => {
				const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
				cb(null, `${uniqueSuffix}${extname(file.originalname)}`)
			}
		})
	}))
	async updatePhoto(@Body() data: UpdateUserPhotoBody, @UploadedFile() file: Express.Multer.File): Promise<SafeUser | null> {
		if (!file) {
			throw new BadRequestException('Photo file is required')
		}
		if (!data?.id || Number.isNaN(Number(data.id))) {
			throw new BadRequestException('Valid user id is required')
		}

		const user = await this.usersService.updateUserPhoto({
			id: Number(data?.id),
			photo: `/uploads/users/${file.filename}`
		})

		if (!user) {
			return user
		}

		return this.sanitizeUser(user)
	}
}
