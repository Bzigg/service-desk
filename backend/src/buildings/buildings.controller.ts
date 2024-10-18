import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common'
import { BuildingsService } from './buildings.service'

@Controller('buildings')
export class BuildingsController {

  constructor(private buildingsService: BuildingsService) {
  }

  @Get()
  getBuildingById(@Query() query) {
    return this.buildingsService.getBuildingById(query?.id)
  }

  @Get('/all')
  getAll() {
    return this.buildingsService.getAllBuildings()
  }

  @Post('/add')
  addBuilding(@Body() dto, @Headers('authorization') token: string) {
    return this.buildingsService.addBuilding(dto, token)
  }
}
