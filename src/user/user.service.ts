import { Model } from 'mongoose';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './common/dto/create-user.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
  
      const newUser = new this.UserModel(createUserDto);
  
      return newUser.save();
    }

    async getUser(email: string): Promise<User> {
      const user = await this.UserModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    }
}
