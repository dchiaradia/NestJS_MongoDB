import { Injectable } from "@nestjs/common";
import { MongoUsersRepositoryService } from "../../repository/mongodb/users/mongo.users.service";
import { MyResponseEntity } from "../../core/myResponse";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private userRepository: MongoUsersRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<MyResponseEntity> {
    let response: MyResponseEntity;
    try {
      const data = await this.userRepository.create(createUserDto);
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
      const data = await this.userRepository.find({});
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
      const data = await this.userRepository.findById(id);
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
      const data = await this.userRepository.find(payload);
      if (data.table.length <= 0) {
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
      const data = await this.userRepository.find({ email: email });
      if (data.table.length <= 0) {
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
      const data = await this.userRepository.findByIdAndUpdate(
        id,
        updateUserDto
      );
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
      const data = await this.userRepository.findByIdAndDelete(id);
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
