import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../modules/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: { id: string }) {
    const { id } = payload;
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UnauthorizedException("Usuário não encontrado");
    }
    return payload;
  }
}
