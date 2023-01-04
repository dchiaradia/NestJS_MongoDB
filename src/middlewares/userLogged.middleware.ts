import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import jwt_decode from "jwt-decode";

@Injectable()
export class UserLoggedMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log("Authorization Token: ", req.headers["authorization"]);
    const token = req.headers["authorization"];

    //CHECK HEADER
    if (token == undefined) {
      console.log("Authorization Token not defined in header, check again!");
      res.status(403).json({
        status: "FAILED",
        httpCode: 403,
        description: "Authorization Token not defined in header, check again!",
        data: { access_token: req.headers.access_token },
      });
      return;
    }

    //DECODE TOKEN - CHECK USER AUTHORIZATION
    const tokenDecoded = jwt_decode(token.replace("Bearer ", ""));
    const validToken = true;
    if (validToken != true) {
      res.status(403).json({
        status: "FAILED",
        httpCode: 403,
        description: "User Authorization not is valid!",
        data: { access_token: req.headers.access_token },
      });
      return;
    }
    next();
  }
}
