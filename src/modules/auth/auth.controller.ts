import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private svc: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  async register(@Body() body: RegisterDto) {
    return this.svc.register(body.email, body.password, body.name);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() body: LoginDto) {
    return this.svc.login(body.email, body.password);
  }
}
