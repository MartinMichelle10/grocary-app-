import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './item.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), AuthModule],
  providers: [ItemsRepository, ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
