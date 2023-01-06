import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Model } from "mongoose";

@Schema({ collection: "users" })
export class User extends Model {
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
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
