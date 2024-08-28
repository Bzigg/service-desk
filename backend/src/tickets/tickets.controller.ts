import { Body, Controller } from "@nestjs/common";
import { CreateTicketDto } from './dto/createTicket.dto'
import { TicketsService } from './tickets.service'

@Controller('tickets')
export class TicketsController {

  constructor(private ticketsService: TicketsService) {
  }

  createTicket(@Body() ticketDto: CreateTicketDto) {
    this.ticketsService.create(ticketDto)
  }
}
