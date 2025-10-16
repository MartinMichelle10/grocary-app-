import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository, private cfg: ConfigService) {}

  async register(email: string, password: string, name?: string): Promise<User> {
    const exists = await this.repo.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');
    const saltRounds = this.cfg.bcryptRounds;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = this.repo.create({ email, password_hash: hash, name });
    return this.repo.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.repo.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password_hash);
    return match ? user : null;
  }

  async findById(id: number) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
