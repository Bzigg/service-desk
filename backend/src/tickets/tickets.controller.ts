import { Body, Controller, Get, Headers, Patch, Post, Put, Query } from '@nestjs/common'
import { CreateTicketDto } from './dto/createTicket.dto'
import { AssignTicketDto } from './dto/assignTicket.dto'
import { ChangeTicketDto } from './dto/changeTicket.dto'
import { GetTicketDto } from './dto/getTicket.dto'
import { UpdateStatusDto } from './dto/updateStatus.dto'
import { TicketsService } from './tickets.service'
import { statusEnum } from './constants'
import { IParams } from './models'

@Controller('tickets')
export class TicketsController {

  constructor(private ticketsService: TicketsService) {
  }

  @Get()
  getTicket(@Query() query: GetTicketDto) {
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
  assignTicket(@Body() data: AssignTicketDto, @Headers('authorization') token: string) {
    return this.ticketsService.assignTicket(data.ticketId, token)
  }

  @Put('/change')
  changeTicket(@Body() data: ChangeTicketDto, @Headers('authorization') token: string) {
    return this.ticketsService.changeTicket(data, token)
  }

  @Patch('/status')
  updateStatus(@Body() data: UpdateStatusDto, @Headers('authorization') token: string) {
    return this.ticketsService.updateStatus(data, token)
  }
}
