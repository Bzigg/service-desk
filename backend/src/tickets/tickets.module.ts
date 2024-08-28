import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Ticket } from "./tickets.model";

@Module({
  providers: [TicketsService],
  controllers: [TicketsController],
  imports: [
    SequelizeModule.forFeature([User, Ticket])
  ],
})
export class TicketsModule {}
