import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_TITLE)
    .setDescription(process.env.APP_DESCRIPTION)
    .setVersion(process.env.APP_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_PATH, app, document);

  await app.listen(process.env.API_PORT);
  console.log("STARTING________________________________");
  console.log("> API PORT     :", process.env.API_PORT);
  console.log("> SWAGGER_PATH :", process.env.SWAGGER_PATH);
  console.log("> TIMEZONE :", process.env.TZ);
  console.log("________________________________________");
}
bootstrap();
