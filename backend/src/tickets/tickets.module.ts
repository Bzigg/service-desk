import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Ticket } from "./tickets.model";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
  providers: [TicketsService],
  controllers: [TicketsController],
  imports: [
    SequelizeModule.forFeature([User, Ticket]),
    AuthModule,
    UsersModule
  ],
})
export class TicketsModule {}
