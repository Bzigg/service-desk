import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AuthService } from '../auth/auth.service'
import { Building } from './buildings.model'
import { AddBuildingDto } from './dto/addBuilding.dto'

@Injectable()
export class BuildingsService {

  constructor(
    @InjectModel(Building) private buildingRepository: typeof Building,
    private authService: AuthService,
  ) {}

  async getBuildingById(id?: string): Promise<Building | null> {
    if (!id) {
      throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST)
    }
    const where = {
      id: id
    }

    return await this.buildingRepository.findOne({ where })
  }

  async getAllBuildings(): Promise<Building[]> {
    return await this.buildingRepository.findAll()
  }

  async addBuilding(data: AddBuildingDto, token: string): Promise<Building> {
    const userId = await this.authService.getUserIdByToken(token)

    return await this.buildingRepository.create({
      ...data,
      userId: userId
    })
  }
}
