import { BadRequestException, Body, Controller, Get, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'
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

	@Put('/photo')
	@UseInterceptors(FileInterceptor('photo', {
		limits: {
			fileSize: 5 * 1024 * 1024
		},
		fileFilter: (_req, file, cb) => {
			const allowedMimeTypes = ['image/jpeg', 'image/png']
			const extension = extname(file.originalname).toLowerCase()
			const allowedExtensions = ['.jpg', '.jpeg', '.png']
			if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(extension)) {
				return cb(new BadRequestException('Only jpg and png files are allowed') as any, false)
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
	async updatePhoto(@Body() data: { id: string }, @UploadedFile() file: any): Promise<any> {
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

		const userData = user?.toJSON()
		const { password, ...safeUser } = userData
		return safeUser
	}
}
