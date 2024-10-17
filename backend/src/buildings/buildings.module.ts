import { Module } from '@nestjs/common'
import { BuildingsService } from './buildings.service'
import { BuildingsController } from './buildings.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Ticket } from '../tickets/tickets.model'

@Module({
  providers: [BuildingsService],
  controllers: [BuildingsController],
  imports: [
    SequelizeModule.forFeature([Ticket]),
  ],
})

export class BuildingsModule {}
