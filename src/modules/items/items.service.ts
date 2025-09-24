import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ItemsRepository } from './items.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private repo: ItemsRepository) {}

  async create(userId: string, dto: CreateItemDto) {
    const item = this.repo.create({ ...dto, user_id: userId });
    return this.repo.save(item);
  }

  async findAll(userId: string) {
    return this.repo.findByUser(userId);
  }

  async update(userId: string, id: string, dto: UpdateItemDto) {
    const item = await this.repo.findByIdAndUser(id, userId);
    if (!item) throw new NotFoundException('Item not found');
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(userId: string, id: string) {
    const item = await this.repo.findByIdAndUser(id, userId);
    if (!item) throw new NotFoundException('Item not found');
    await this.repo.delete(item.id);
    return;
  }
}
