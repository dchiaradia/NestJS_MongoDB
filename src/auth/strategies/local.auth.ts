//local.auth.ts
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.data[0].senha === password) {
      return await this.authService.gerarToken(this._toToken(user.data[0]));
    }
    throw new UnauthorizedException("Usuário ou Senha Inválidos");
  }

  _toToken(data: any) {
    return {
      id: data._id,
      email: data.email,
    };
  }
}
