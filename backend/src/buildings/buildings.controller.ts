import { Body, Controller, Headers, Post } from '@nestjs/common'
import { BuildingsService } from './buildings.service'

@Controller('buildings')
export class BuildingsController {

  constructor(private ticketsService: BuildingsService) {
  }

  @Post('/add')
  addBuilding(@Body() dto, @Headers('authorization') token: string) {
    return this.ticketsService.addBuilding(dto, token)
  }
}
