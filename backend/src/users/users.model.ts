import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Ticket } from '../tickets/tickets.model'

interface UserCreationAtr {
	email: string
	password: string
	firstName: string
	lastName: string
	surname: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAtr>{
	set;
	setAttributes;

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: true, })
	email: string;

	@Column({ type: DataType.STRING })
	password: string;

	@Column({ type: DataType.STRING })
	firstName: string;

	@Column({ type: DataType.STRING })
	lastName: string;

	@Column({ type: DataType.STRING })
	surname: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: true })
	isUser: boolean;

	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	isAdmin: boolean;

	@HasMany(() => Ticket)
	tickets: Ticket[]
}
