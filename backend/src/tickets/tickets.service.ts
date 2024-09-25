import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AuthService } from "../auth/auth.service";
import { Ticket } from "./tickets.model";
import { UserRole } from "../auth/constants";
import { UsersService } from "../users/users.service";
import { statusEnum } from "./constants";

@Injectable()
export class TicketsService {

  constructor(
    @InjectModel(Ticket) private ticketRepository: typeof Ticket,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  async create(ticketDto, token) {
    const userId = await this.authService.getUserIdByToken(token);
    return await this.ticketRepository.create({
      ...ticketDto,
      customerId: userId
    })
  }

  async getAllTickets() {
    return await this.ticketRepository.findAll()
  }

  async getUserTickets(token) {
    const userId = await this.authService.getUserIdByToken(token);
    const user = await this.userService.getUserById(userId);

    return await this.ticketRepository.findAll({
      where: {
        [user.isUser ? 'customerId' :'responsibleId']: user.id
      }
    })
  }

  async assignTicket(ticketId, token: string) {
    const userId = await this.authService.getUserIdByToken(token);
    const ticket = await this.getTicketById(ticketId)

    await ticket.update({
      responsibleId: userId
    })

    return await ticket.save()
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
