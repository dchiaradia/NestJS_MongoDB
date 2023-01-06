import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserLoggedMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log("Authorization Token: ", req.headers["authorization"]);
    const token = req.headers["authorization"];

    //CHECK HEADER
    if (token == undefined) {
      console.log("Authentication Token not defined in header, check again!");
      res.status(403).json({
        status: "FAILED",
        httpCode: 401,
        description: "Authentication Token not defined in header, check again!",
        data: { access_token: req.headers.access_token },
      });
      return;
    }

    //DECODE TOKEN - CHECK IF TOKEN IS VALID
    const jwtDecode = await this.authService.decode(req);
    if (!jwtDecode["isValid"]) {
      res.status(403).json({
        status: "FAILED",
        httpCode: 401,
        description: "User Authentication not is valid!",
        data: { access_token: req.headers.access_token },
      });
      return;
    }

    next();
  }
}
