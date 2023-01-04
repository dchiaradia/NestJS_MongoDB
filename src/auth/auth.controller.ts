import { Controller, Post, Body, Req, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.auth";
import { LocalAuthUserDTO } from "./strategies/local.auth.user.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(
    private readonly localAuthService: LocalStrategy,
    private readonly authService: AuthService
  ) {}

  @Post("local")
  @ApiOperation({ summary: "Local Login with user and password" })
  async login(@Body() body: LocalAuthUserDTO) {
    return this.localAuthService.validate(body.email, body.senha);
  }

  @Get("decode")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Valid User JWT Token" })
  async decode(@Req() req: any) {
    return await this.authService.decode(req);
  }
}
