import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MyResponse } from "../../core/myResponse";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, MyResponse],
})
export class UsersModule {}
