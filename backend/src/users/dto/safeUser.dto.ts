import { User } from '../users.model'

export type SafeUserDto = Omit<ReturnType<User['toJSON']>, 'password'>
