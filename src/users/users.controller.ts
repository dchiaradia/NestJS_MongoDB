import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MyResponse } from "src/core/myResponse";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private response: MyResponse
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("Post > Users > Create");
    const data = await this.usersService.create(createUserDto);
    return this.response.http(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
