import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { CreateTicketDto } from './dto/createTicket.dto'
import { TicketsService } from './tickets.service'

@Controller('tickets')
export class TicketsController {

  constructor(private ticketsService: TicketsService) {
  }

  @Post('/create')
  createTicket(@Body() ticketDto: CreateTicketDto, @Headers('authorization') token: string) {
    return this.ticketsService.create(ticketDto, token)
  }

  @Get('/my')
  getUserTickets(@Headers('authorization') token: string) {
    return this.ticketsService.getUserTickets(token)
  }

  @Get()
  getTicket(@Query() query) {
    return this.ticketsService.getTicketById(query.id)
  }
}
