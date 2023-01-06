import { Injectable } from "@nestjs/common";
import { MyResponseEntity } from "../../core/myResponse";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MongoUsersService } from "../../handlers/mongodbHandler/users/mongo.users.service";

@Injectable()
export class UsersService {
  constructor(private dbUserService: MongoUsersService) {}

  async create(createUserDto: CreateUserDto): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.dbUserService.create(createUserDto);
      response = {
        status: "OK",
        httpCode: 201,
        description: "CREATED USER SUCCESS",
        data: data,
      };
    } catch (e) {
      console.log(e);
      response = {
        status: "FAILED",
        httpCode: 500,
        description: e,
        data: e,
      };
    }

    return response;
  }

  async findAll(): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.dbUserService.find({});
      response = {
        status: "OK",
        httpCode: 200,
        description: "FIND ALL SUCCESS",
        data: data,
      };
    } catch (e) {
      response = {
        status: "FAILED",
        httpCode: 500,
        description: e,
        data: e,
      };
    }
    return response;
  }

  async findOne(id: string): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.dbUserService.findOne(id);
      response = {
        status: "OK",
        httpCode: 200,
        description: "FIND ONE SUCCESS",
        data: data,
      };
    } catch (e) {
      response = {
        status: "FAILED",
        httpCode: 500,
        description: e,
        data: e,
      };
    }
    return response;
  }

  async find(payload: any): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.dbUserService.find(payload);
      if (data.length <= 0) {
        throw new Error(`Usuário não localizado.`);
      }

      response = {
        status: "OK",
        httpCode: 200,
        description: "FIND ONE SUCCESS",
        data: data,
      };
    } catch (e) {
      response = {
        status: "FAILED",
        httpCode: 500,
        description: e.message,
        data: [],
      };
    }
    return response;
  }

  async findOneByEmail(email: string): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.dbUserService.find({ email: email });
      if (data.length <= 0) {
        throw new Error(`Usuário não localizado pelo e-mail "${email}"`);
      }

      response = {
        status: "OK",
        httpCode: 200,
        description: "FIND ONE SUCCESS",
        data: data,
      };
    } catch (e) {
      response = {
        status: "FAILED",
        httpCode: 500,
        description: e.message,
        data: [],
      };
    }
    return response;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.dbUserService.update(id, updateUserDto);
      response = {
        status: "OK",
        httpCode: 200,
        description: "USER UPDATE SUCCESS",
        data: { registerCount: data, data: updateUserDto },
      };
    } catch (e) {
      response = {
        status: "FAILED",
        httpCode: 500,
        description: e,
        data: e,
      };
    }
    return response;
  }

  async remove(id: string): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.dbUserService.remove(id);
      response = {
        status: "OK",
        httpCode: 200,
        description: "REMOVE USER SUCCESS",
        data: { registerCount: data },
      };
    } catch (e) {
      response = {
        status: "FAILED",
        httpCode: 500,
        description: e,
        data: e,
      };
    }
    return response;
  }
}
