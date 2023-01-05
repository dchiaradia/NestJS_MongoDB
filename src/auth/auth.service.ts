import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { LocalAuthUserDTO } from "./local.auth.user.dto";
// import { UserRole } from "../users/user-roles.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(data: LocalAuthUserDTO) {
    const user = await this.usersService.find({
      email: data.email,
      senha: data.senha,
    });

    if (user === null) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    if (user.httpCode != 200) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    const jwtPayload = user.data[0];
    const token = await this.jwtService.sign(this._toToken(jwtPayload));
    return { token };
  }

  _toToken(data: any) {
    return {
      id: data._id,
      email: data.email,
      nome: data.nome,
      role: data.role,
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
