import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MyResponse } from "../../core/myResponse";
import { MongoDBModule } from "../../repository/mongodb/mongo.module";

@Module({
  imports: [MongoDBModule],
  controllers: [UsersController],
  providers: [UsersService, MyResponse],
})
export class UsersModule {}
