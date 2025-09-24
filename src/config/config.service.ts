import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ConfigService {
  get port(): number {
    return Number(process.env.PORT || 3000);
  }
  get databaseUrl(): string {
    return process.env.DATABASE_URL || '';
  }
  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'changeme';
  }
  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '1h';
  }
  get bcryptRounds(): number {
    return Number(process.env.BCRYPT_SALT_ROUNDS || 10);
  }
  get corsAllowedOrigins(): string {
    return process.env.CORS_ALLOWED_ORIGINS || '*';
  }
}
