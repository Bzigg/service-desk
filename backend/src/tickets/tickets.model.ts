import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface TicketCreationAtr {
  customerId: number
  responsibleId: number
  title: string
  description: string
  building: string
  cabinet: string
  phone: string
  status: string
}

@Table({tableName: 'tickets'})
export class Ticket extends Model<Ticket, TicketCreationAtr>{
  set;
  setAttributes;

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  customerId: number;

  @Column({ type: DataType.INTEGER })
  responsibleId: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  description: string;

  // todo мб id строения?
  @Column({ type: DataType.STRING })
  building: string;

  @Column({ type: DataType.STRING })
  cabinet: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  status: string;

  @BelongsTo(() => User)
  customer: User
}
