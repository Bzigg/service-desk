import { UserRole } from '../constants'

export class RegistrationDto {
	email: string
	password: string
	firstName: string
	lastName: string
	surname: string
	role: UserRole
}
