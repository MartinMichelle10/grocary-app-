import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ name: 'items' })
@Index(['userId'])
@Index(['name'])
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column({ length: 255, name: 'name' })
  name: string;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @Column({ nullable: true, name: 'store' })
  store?: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
