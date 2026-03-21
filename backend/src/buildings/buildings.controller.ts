import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common'
import { BuildingsService } from './buildings.service'
import { GetBuildingByIdDto } from './dto/getBuildingById.dto'
import { AddBuildingDto } from './dto/addBuilding.dto'

@Controller('buildings')
export class BuildingsController {

  constructor(private buildingsService: BuildingsService) {
  }

  @Get()
  getBuildingById(@Query() query: GetBuildingByIdDto) {
    return this.buildingsService.getBuildingById(query?.id)
  }

  @Get('/all')
  getAll() {
    return this.buildingsService.getAllBuildings()
  }

  @Post('/add')
  addBuilding(@Body() dto: AddBuildingDto, @Headers('authorization') token: string) {
    return this.buildingsService.addBuilding(dto, token)
  }
}
