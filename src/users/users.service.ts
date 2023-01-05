import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MyResponseEntity } from "src/core/myResponse";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.userModel.create(createUserDto);
      response = {
        status: "OK",
        httpCode: 201,
        description: "CREATED USER SUCCESS",
        data: data,
      };
    } catch (e) {
      console.log(e);
      // response = {
      //   status: 'FAILED',
      //   httpCode: 500,
      //   description: e,
      //   data: e,
      // };
    }

    return response;
  }

  async findAll(): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.userModel.find();
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
      const data = await this.userModel.findById(id);
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
      const data = await this.userModel.find(payload);
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
      const data = await this.userModel.find({ email: email });
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
      const data = await this.userModel.findByIdAndUpdate(id, updateUserDto);
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
      const data = await this.userModel.findByIdAndDelete(id);
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
