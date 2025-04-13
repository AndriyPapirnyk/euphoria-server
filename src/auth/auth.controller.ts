import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './common/dto/signUp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async register(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('logIn/:email')
  async login(@Param('email') email: string) {
    return this.authService.logIn(email);
  }
}