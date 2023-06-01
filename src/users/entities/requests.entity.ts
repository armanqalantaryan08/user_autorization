import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RawBaseEntity } from './rawBase.entity';
import { UsersEntity } from './user.entity';

@Entity('requests')
export class RequestsEntity extends RawBaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.incomingRequests)
  @JoinColumn({ name: 'requester_id' })
  requester: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.outgoingRequests)
  @JoinColumn({ name: 'requestee_id' })
  requestee: UsersEntity;
}
