import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.entity";
import { MongoUsersRepositoryService } from "./mongo.users.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [MongoUsersRepositoryService],
  exports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongoUsersRepositoryService,
  ],
})
export class MongoUsersModule {}
