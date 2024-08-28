import { Injectable } from '@nestjs/common'

@Injectable()
export class TicketsService {

  create(ticket) {
    console.log(ticket);
  }
}
