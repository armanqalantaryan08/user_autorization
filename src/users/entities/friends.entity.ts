import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RawBaseEntity } from './rawBase.entity';
import { UsersEntity } from './user.entity';

@Entity('friends')
export class FriendsEntity extends RawBaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.friends)
  @JoinColumn({ name: 'user_uuid' })
  user: UsersEntity;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'friend_uuid' })
  friend: UsersEntity;
}
