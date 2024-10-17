import { WhereOptions } from 'sequelize'
import { Ticket } from './tickets.model'

export type TWhere = WhereOptions<Ticket>

export interface IParams {
  status?: string
  limit?: number
  page?: number
}
