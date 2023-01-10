import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../modules/users/users.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { MongoDBModule } from "../repository/mongodb/mongo.module";

@Module({
  imports: [
    MongoDBModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_MINUTES_EXPIRE,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
