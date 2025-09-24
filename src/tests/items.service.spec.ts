import { Test } from '@nestjs/testing';
import { ItemsService } from '../modules/items/items.service';
import { ItemsRepository } from '../modules/items/items.repository';

describe('ItemsService', () => {
  let svc: ItemsService;
  const mockRepo = { create: jest.fn(), save: jest.fn(), findByUser: jest.fn(), findByIdAndUser: jest.fn(), delete: jest.fn() };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: ItemsRepository, useValue: mockRepo },
      ],
    }).compile();
    svc = module.get(ItemsService);
  });

  it('create calls repo.save', async () => {
    mockRepo.create.mockReturnValue({ temp: true });
    mockRepo.save.mockResolvedValue({ id: 'i1' });
    const res = await svc.create('u1', { name: 'apple', quantity: 2 } as any);
    expect(res).toHaveProperty('id', 'i1');
  });
});
