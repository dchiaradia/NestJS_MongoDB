import { NestResponseBuilder } from './http/nest-response-builder';
import { IsString, IsNumber } from 'class-validator';

export class MyResponseEntity {
  @IsString()
  status: string;

  @IsNumber()
  httpCode: number;

  @IsString()
  description: string;

  headers?: any;
  data?: any;

  constructor(
    status = 'OK',
    httpCode = 200,
    description = '',
    headers?,
    data?,
  ) {
    this.status = status;
    this.httpCode = httpCode;
    this.description = description;
    this.headers = headers;
    this.data = data;
  }
}

export class MyResponse {
  http(response: MyResponseEntity) {
    const result = {
      status: response.status == undefined ? 'OK' : response.status,
      description:
        response.description == undefined ? '' : response.description,
      data: response.data == undefined ? {} : response.data,
    };

    return new NestResponseBuilder()
      .status(response.httpCode == undefined ? 200 : response.httpCode)
      .headers(response.headers == undefined ? {} : response.headers)
      .body(result)
      .build();
  }
}
