import { Body, Controller, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './common/dto/create-user.dto';


@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get(':email')
  async getUser(@Param('email') email: string) {
    return this.userService.getUser(email);
  }

}
