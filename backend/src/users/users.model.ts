import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface UserCreationAtr {
	email: string
	password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAtr>{
	set: any;
	setAttributes: any;

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: true, })
	email: string;

	@Column({ type: DataType.STRING })
	password: string;
}
