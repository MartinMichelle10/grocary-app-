import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './config/config.module';
import { join } from 'path';
import { ConfigService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { ItemsModule } from './modules/items/items.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        url: cfg.databaseUrl,
        synchronize: false,
        logging: false,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [join(__dirname, '..', 'migrations', '*.sql')],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ItemsModule,
  ],
})
export class AppModule {}
