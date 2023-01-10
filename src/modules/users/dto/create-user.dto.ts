import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "../../../repository/mongodb/users/user.entity";
import { UserRole } from "../entities/user.roles.enum";

export class CreateUserDto {
  @Prop()
  @ApiProperty({
    description: "Campo nome do usuário",
  })
  @IsString({ message: "O Campo nome do usuário deve ser uma string." })
  nome: string;

  @Prop()
  @ApiProperty({
    description: "Email",
  })
  email: string;

  @Prop()
  @ApiProperty({
    description: "Senha",
  })
  senha: string;

  @Prop()
  @ApiProperty({
    description: "Role",
  })
  role: UserRole;
}
