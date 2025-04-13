// auth/auth.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/schemas/user.schema';
import { SignUpDto } from './common/dto/signUp.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private UserService: UserService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {

    const { name, email, password, type, img  } = signUpDto;
      
    const existing = await this.UserModel.findOne({
        $or: [{ email }],
    });
      
    if (existing) {
        throw new ConflictException({
            message: 'User with this email or username already exists',
        });
    }
  
    if(type === 'local'){
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.UserService.create({ 
              name,
              email,
              password: hashedPassword,
              type,
              img
            });
    
            return newUser;
    }else if(type === 'oauth'){
        const newUser = await this.UserService.create({ 
            name,
            email,
            type,
            img
        });

        return newUser;
    }
    throw new NotFoundException('Password must be more than 6 characters');
}
async logIn(email: string): Promise<string> {
    
  const existing = await this.UserModel.findOne({email });
  console.log('existing', existing);

  if(existing !== null) {
    if (existing?.type === 'oauth') {
      return email;
    }else{
      throw new ConflictException({
        message: 'Sorry but you need to provide a password to log in',
    });
    }
  }else{
    throw new NotFoundException({
      message: 'User with this email not found',
    });
  }
}

}
