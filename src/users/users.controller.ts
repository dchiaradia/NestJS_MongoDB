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
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private response: MyResponse
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a user" })
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("Post > Users > Create");
    const data = await this.usersService.create(createUserDto);
    return this.response.http(data);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: "Return all users" })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get(":id")
  @ApiOperation({ summary: "Return One User" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(":id")
  @ApiOperation({ summary: "Update One User" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(":id")
  @ApiOperation({ summary: "Delete a User" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
