import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "../../../modules/users/dto/create-user.dto";
import { UpdateUserDto } from "../../../modules/users/dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class MongoUsersService {
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

  async findAll() {
    try {
      const data = await this.userModel.find();
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.userModel.findById(id);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async find(payload: any) {
    try {
      const data = await this.userModel.find(payload);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const data = await this.userModel.find({ email: email });
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async remove(id: string) {
    try {
      const data = await this.userModel.findByIdAndDelete(id);
      return data;
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
