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
  findByUser(userId: string) {
    return this.repo.find({ where: { user_id: userId }, order: { created_at: 'DESC' } });
  }
  findByIdAndUser(id: string, userId: string) {
    return this.repo.findOne({ where: { id, user_id: userId } });
  }
  delete(id: string) {
    return this.repo.delete(id);
  }
}
