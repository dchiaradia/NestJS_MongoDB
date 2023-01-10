import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { response } from "express";
import {
  findTableModel,
  findTableResponseModel,
} from "../../../core/models/find-table.model";
import { CreateUserDto } from "../../../modules/users/dto/create-user.dto";
import { UpdateUserDto } from "../../../modules/users/dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class MongoUsersRepositoryService {
  constructor(@InjectModel(User.name) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.userModel.create(createUserDto);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async findById(id: string) {
    try {
      const data = await this.userModel.findById(id);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async find(
    payload: any,
    options = new findTableModel()
  ): Promise<findTableResponseModel> {
    try {
      const data = await this.userModel
        .find(payload)
        .skip(options.pageSize * (options.page - 1))
        .limit(options.pageSize);
      const response = new findTableResponseModel();
      response.table = data;
      response.page = options.page;
      response.pageSize = options.pageSize;
      response.totalCount = await this.userModel.find(payload).count();
      response.totalPages = Math.ceil(response.totalCount / response.pageSize);

      return response;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async findByIdAndUpdate(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async findByIdAndDelete(id: string) {
    try {
      const data = await this.userModel.findByIdAndDelete(id);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
