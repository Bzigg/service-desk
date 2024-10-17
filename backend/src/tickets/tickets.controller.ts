import { Body, Controller, Get, Headers, Patch, Post, Put, Query } from '@nestjs/common'
import { CreateTicketDto } from './dto/createTicket.dto'
import { TicketsService } from './tickets.service'
import { statusEnum } from './constants'

@Controller('tickets')
export class TicketsController {

  constructor(private ticketsService: TicketsService) {
  }

  @Get()
  getTicket(@Query() query) {
    return this.ticketsService.getTicketById(query.id)
  }

  @Get('/all')
  getAll(@Query() query: IParams) {
    return this.ticketsService.getAllTickets(Object.keys(query).length ? query : null )
  }

  @Post('/create')
  createTicket(@Body() ticketDto: CreateTicketDto, @Headers('authorization') token: string) {
    return this.ticketsService.create({ ...ticketDto, status: statusEnum.OPEN }, token)
  }

  @Get('/my')
  getUserTickets(@Query() query: IParams, @Headers('authorization') token: string) {
    return this.ticketsService.getUserTickets(Object.keys(query).length ? query : null, token)
  }

  @Post('/assign')
  assignTicket(@Body() data: { ticketId: string }, @Headers('authorization') token: string) {
    return this.ticketsService.assignTicket(data.ticketId, token)
  }

  @Put('/change')
  changeTicket(@Body() data, @Headers('authorization') token: string) {
    return this.ticketsService.changeTicket(data, token)
  }

  @Patch('/status')
  updateStatus(@Body() data, @Headers('authorization') token: string) {
    return this.ticketsService.updateStatus(data, token)
  }
}
