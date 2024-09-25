import { Body, Controller, Get, Headers, Patch, Post, Query } from "@nestjs/common";
import { CreateTicketDto } from './dto/createTicket.dto'
import { TicketsService } from './tickets.service'

@Controller('tickets')
export class TicketsController {

  constructor(private ticketsService: TicketsService) {
  }

  @Get()
  getTicket(@Query() query) {
    return this.ticketsService.getTicketById(query.id)
  }

  @Get('/all')
  getAll(@Query() query: any) {
    return this.ticketsService.getAllTickets(Object.keys(query).length ? query : null )
  }

  @Post('/create')
  createTicket(@Body() ticketDto: CreateTicketDto, @Headers('authorization') token: string) {
    return this.ticketsService.create(ticketDto, token)
  }

  @Get('/my')
  getUserTickets(@Headers('authorization') token: string) {
    return this.ticketsService.getUserTickets(token)
  }

  @Post('/assign')
  assignTicket(@Body() data: { ticketId: string }, @Headers('authorization') token: string) {
    return this.ticketsService.assignTicket(data.ticketId, token)
  }

  @Patch('/status')
  updateStatus(@Body() data, @Headers('authorization') token: string) {
    return this.ticketsService.updateStatus(data, token)
  }
}
