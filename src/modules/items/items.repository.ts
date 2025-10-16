import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsRepository {
  constructor(@InjectRepository(Item) private repo: Repository<Item>) {}

  create(item: Partial<Item>) {
    return this.repo.create(item);
  }
  save(item: Item) {
    return this.repo.save(item);
  }
  findByUser(userId: number) {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }
  findByIdAndUser(id: number, userId: number) {
    return this.repo.findOne({ where: { id, userId } });
  }
  delete(id: number) {
    return this.repo.delete(id);
  }
}
