import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MyResponse } from "../../core/myResponse";
import { MongoDBHandlerModule } from "../../handlers/mongodbHandler/mongo.module";

@Module({
  imports: [MongoDBHandlerModule],
  controllers: [UsersController],
  providers: [UsersService, MyResponse],
})
export class UsersModule {}
