import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { RawBaseEntity } from './rawBase.entity';
import { RequestsEntity } from './requests.entity';
import { FriendsEntity } from './friends.entity';

@Entity('users')
export class UsersEntity extends RawBaseEntity {
  @Column({ type: 'varchar', length: 512, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  surname: string;

  @Column({ type: 'integer', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @OneToMany(() => RequestsEntity, (request) => request.requester)
  outgoingRequests: Array<RequestsEntity>;

  @OneToMany(() => RequestsEntity, (request) => request.requestee)
  incomingRequests: Array<RequestsEntity>;

  @OneToMany(() => FriendsEntity, (friend) => friend.user)
  friends: Array<FriendsEntity>;
}
