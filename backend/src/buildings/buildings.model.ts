import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface BuildingCreationAtr {
	street: string
	building: string
	name: string
	isActive: string
}

@Table({ tableName: 'buildings' })
export class Building extends Model<Building, BuildingCreationAtr>{
	set;
	setAttributes;

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, })
	id: number;

	@Column({ type: DataType.STRING, })
	street: string;

	@Column({ type: DataType.STRING, })
	building: string;

	@Column({ type: DataType.STRING, })
	name: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: true })
	isActive: boolean;
}
