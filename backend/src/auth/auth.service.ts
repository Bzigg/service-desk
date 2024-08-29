import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.model";
import { UserRole } from "./constants";
const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {

  constructor(
      private usersService: UsersService,
      private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    const token = await this.generateToken(user)
    return this.getAuthData(token, user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException('уже существут', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)

    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword
    })

    const token = await this.generateToken(user)
    return this.getAuthData(token, user)
  }

  async getUserIdByToken(token: string) {
    const data = this.jwtService.decode(token)
    return data.id
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      // roles
    }

    return this.jwtService.sign(payload)
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)

    if (user && passwordEquals) {
      return user
    }

    throw new UnauthorizedException({message: 'неверный логин или пароль'})
  }

  private getAuthData(token: string, user: User) {
    return {
      token,
      id: user.id,
      roles: this.getUserRoles(user)
    }
  }

  private getUserRoles(user: User) {
    const roles = []
    if (user.isUser) {
      roles.push(UserRole.USER)
    } else {
      roles.push(UserRole.ADMIN)
    }
    return roles
  }
}
