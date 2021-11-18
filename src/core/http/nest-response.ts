export class NestResponse {
  status: number;
  headers: any;
  body: any;

  constructor(resposta: NestResponse) {
    Object.assign(this, resposta);
  }
}
