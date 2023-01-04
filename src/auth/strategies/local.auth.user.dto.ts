import { ApiProperty } from "@nestjs/swagger";

export class LocalAuthUserDTO {
  @ApiProperty({
    description: "Email",
  })
  email: string;

  @ApiProperty({
    description: "Senha",
  })
  senha: string;
}
