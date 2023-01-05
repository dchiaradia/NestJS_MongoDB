import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { LocalAuthUserDTO } from "./local.auth.user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signin")
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: LocalAuthUserDTO
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get("/me")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getMe(@Req() req): Promise<any> {
    return await this.authService.decode(req);
  }
}
