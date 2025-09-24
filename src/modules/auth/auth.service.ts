import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../../config/config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService, private cfg: ConfigService) {}

  async register(email: string, password: string, name?: string) {
    const user = await this.users.register(email, password, name);
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(email: string, password: string) {
    const user = await this.users.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email }, { expiresIn: this.cfg.jwtExpiresIn, secret: this.cfg.jwtSecret });
    return { access_token: token };
  }
}
