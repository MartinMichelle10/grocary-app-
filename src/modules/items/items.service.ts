import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ItemsRepository } from './items.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private repo: ItemsRepository) {}

  async create(userId: number, dto: CreateItemDto) {
    const item = this.repo.create({ ...dto, userId });
    return this.repo.save(item);
  }

  async findAll(userId: number) {
    return this.repo.findByUser(userId);
  }

  async update(userId: number, id: number, dto: UpdateItemDto) {
    const item = await this.repo.findByIdAndUser(id, userId);
    if (!item) throw new NotFoundException('Item not found');
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(userId: number, id: number) {
    const item = await this.repo.findByIdAndUser(id, userId);
    if (!item) throw new NotFoundException('Item not found');
    await this.repo.delete(item.id);
    return;
  }
}
