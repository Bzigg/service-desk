import { Module } from '@nestjs/common'
import { BuildingsService } from './buildings.service'
import { BuildingsController } from './buildings.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Building } from './buildings.model'
import { AuthModule } from '../auth/auth.module'

@Module({
  providers: [BuildingsService],
  controllers: [BuildingsController],
  imports: [
    SequelizeModule.forFeature([Building]),
    AuthModule,
  ],
})

export class BuildingsModule {}
