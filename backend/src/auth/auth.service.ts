import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.model";
const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {

  constructor(
      private usersService: UsersService,
      private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
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

    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      // roles
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
