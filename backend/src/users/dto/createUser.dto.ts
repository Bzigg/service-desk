export class CreateUserDto {
	readonly email: string
	readonly password: string
	readonly firstName: string
	readonly lastName: string
	readonly surname: string
	readonly isUser: boolean
	readonly isAdmin: boolean
}