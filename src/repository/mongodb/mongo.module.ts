import { Module } from "@nestjs/common";
import { MongoUsersModule } from "./users/mongo-users.module";
import { MongoUsersRepositoryService } from "./users/mongo.users.service";

@Module({
  imports: [MongoUsersModule],
  controllers: [],
  providers: [MongoUsersRepositoryService],
  exports: [MongoUsersModule],
})
export class MongoDBModule {}
