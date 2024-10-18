import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AuthService } from '../auth/auth.service'
import { Building } from './buildings.model'

@Injectable()
export class BuildingsService {

  constructor(
    @InjectModel(Building) private buildingRepository: typeof Building,
    private authService: AuthService,
  ) {}

  async addBuilding(data, token) {
    const userId = await this.authService.getUserIdByToken(token)

    return await this.buildingRepository.create({
      ...data,
      userId: userId
    })
  }
}
