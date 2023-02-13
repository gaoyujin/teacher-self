import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'photo' })
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;

  @Column({ type: 'varchar', length: 80 })
  url: string;
}
