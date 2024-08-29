import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/sequelize";
import { AuthService } from "../auth/auth.service";
import { Ticket } from "./tickets.model";

@Injectable()
export class TicketsService {

  constructor(
    @InjectModel(Ticket) private ticketRepository: typeof Ticket,
    private authService: AuthService
  ) {}

  async create(ticketDto, token) {
    const userId = await this.authService.getUserIdByToken(token);
    return await this.ticketRepository.create({
      ...ticketDto,
      customerId: userId
    })
  }
}
