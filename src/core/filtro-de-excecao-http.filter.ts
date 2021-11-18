import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost, AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class FitroDeExcecaoHttp implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const contexto = host.switchToHttp();
    const requisicao = contexto.getRequest();
    const resposta = contexto.getResponse();
    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: {
              status: exception.getStatus(),
              description: exception.getResponse()['error'], //'Error',
              data: exception.getResponse()['message'],
              request: requisicao.body,
            },
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              description: exception.message,
              data: {
                timestamp: new Date().toISOString(),
                path: requisicao.path,
                request: requisicao.body,
              },
            },
          };

    this.httpAdapter.reply(resposta, body, status);
  }
}
