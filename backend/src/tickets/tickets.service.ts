import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/sequelize";
import { AuthService } from "../auth/auth.service";
import { Ticket } from "./tickets.model";
import { UserRole } from "../auth/constants";
import { UsersService } from "../users/users.service";

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

  async getTicketById(id: string) {
    return await this.ticketRepository.findOne({
      where: {
        id: id,
      }
    })
  }
}
