import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FitroDeExcecaoHttp } from "./core/filtro-de-excecao-http.filter";
import { TransformaRespostaInterceptor } from "./core/http/transforma-resposta.interceptor";
import { UserLoggedMiddleware } from "./middlewares/userLogged.middleware";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `./env/${ENV}.env`, isGlobal: true }), //configuracao do arquivo de configuracoes
    MongooseModule.forRoot(process.env.MONGODB_CONNECTIONSTRING),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: FitroDeExcecaoHttp,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformaRespostaInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserLoggedMiddleware)
      .exclude({ path: "auth/local", method: RequestMethod.ALL })
      .forRoutes(
        { path: "users", method: RequestMethod.ALL },
        { path: "auth/decode", method: RequestMethod.GET }
      );
  }
}
