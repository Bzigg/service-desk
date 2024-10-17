import { Body, Controller, Post } from '@nestjs/common'

@Controller('buildings')
export class BuildingsController {

  @Post('/add')
  addBuilding(@Body() dto) {
    console.log(dto);
  }
}
