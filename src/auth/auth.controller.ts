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
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthUserDTO } from "./strategies/local.auth.user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signin")
  @ApiOperation({ summary: "Make login and return token JWT" })
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: LocalAuthUserDTO
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get("/me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Decodifica o token" })
  @UseGuards(AuthGuard())
  async getMe(@Req() req): Promise<any> {
    return await this.authService.decode(req);
  }
}
