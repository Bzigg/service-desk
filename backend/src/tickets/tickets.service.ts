import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AuthService } from "../auth/auth.service";
import { Ticket } from "./tickets.model";
import { UsersService } from "../users/users.service";
import { statusEnum } from "./constants";

@Injectable()
export class TicketsService {

  constructor(
    @InjectModel(Ticket) private ticketRepository: typeof Ticket,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  async create(ticket, token) {
    const userId = await this.authService.getUserIdByToken(token);
    return await this.ticketRepository.create({
      ...ticket,
      customerId: userId
    })
  }

  async getAllTickets(data: any) {
    const where = data?.status ? {
      status: data.status as string,
    } : undefined

    const { count, rows } = await this.ticketRepository.findAndCountAll({
      where: where
    })

    if (data) {
      return {
        total: count,
        data: await this.ticketRepository.findAll({
          limit: data.limit,
          offset: data.limit * (data.page - 1),
          where: where
        })
      }
    }

    return { total: count, data: rows }
  }

  async getUserTickets(data, token) {
    const userId = await this.authService.getUserIdByToken(token);
    const user = await this.userService.getUserById(userId);

    const where = {
      [user.isUser ? 'customerId' :'responsibleId']: user.id
    }

    if (data?.status) {
      where.status = data.status
    }

    const { count, rows } = await this.ticketRepository.findAndCountAll({
      where: where
    })

    if (data) {
      return { total: count, data: await this.ticketRepository.findAll({
          limit: data.limit,
          offset: data.limit * (data.page - 1),
          where: where
        })
      }
    }

    return { total: count, data: rows }
  }

  async assignTicket(ticketId, token: string) {
    const userId = await this.authService.getUserIdByToken(token);
    const ticket = await this.getTicketById(ticketId)

    await ticket.update({
      responsibleId: userId
    })

    return await ticket.save()
  }

  async changeTicket(data, token: string) {
    const userId = await this.authService.getUserIdByToken(token);
    const ticket = await this.getTicketById(data.ticketId)

    if (!data) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST)
    }

    if (userId === ticket.customerId) {
      await ticket.update({
        title: data.title,
        description: data.description,
        building: data.building,
        cabinet: data.cabinet,
        phone: data.phone,
      })

      return await ticket.save()
    }

    throw new UnauthorizedException({ message: 'неверный логин или пароль' })
  }

  async updateStatus(data, token: string) {
    const userId = await this.authService.getUserIdByToken(token);
    const ticket = await this.getTicketById(data.ticketId)

    if (!statusEnum[data.status]) {
      throw new HttpException('Не верный статус', HttpStatus.BAD_REQUEST)
    }

    if (userId === ticket.responsibleId) {
      await ticket.update({
        status: data.status
      })

      return await ticket.save()
    }

    throw new UnauthorizedException({ message: 'неверный логин или пароль' })
  }

  async getTicketById(id: string) {
    return await this.ticketRepository.findOne({
      where: {
        id: id,
      }
    })
  }
}
