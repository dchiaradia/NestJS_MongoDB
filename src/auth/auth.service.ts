import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async gerarToken(jsonObject: any) {
    return {
      access_token: this.jwtService.sign(jsonObject, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_MINUTES_EXPIRE,
      }),
    };
  }

  async decode(req: any) {
    const token = req.headers["authorization"];
    if (token == undefined) {
      const obj = { isValid: false };
      return obj;
    }
    const jwtDecode = this.jwtService.decode(
      req.headers["authorization"].replace("Bearer ", "")
    );
    jwtDecode["create"] = new Date(jwtDecode["iat"] * 1000).toLocaleString();
    jwtDecode["expire"] = new Date(jwtDecode["exp"] * 1000).toLocaleString();

    const now = new Date();
    jwtDecode["now"] = now.toLocaleString();

    const expire = new Date(jwtDecode["exp"] * 1000);
    jwtDecode["isValid"] = now < expire;
    return jwtDecode;
  }
}
