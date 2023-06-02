import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RawBaseEntity } from './rawBase.entity';
import { UsersEntity } from './user.entity';

@Entity('friends')
export class FriendsEntity extends RawBaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.friends)
  @JoinColumn({ name: 'user1_uuid' })
  user1: UsersEntity;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user2_uuid' })
  user2: UsersEntity;
}
