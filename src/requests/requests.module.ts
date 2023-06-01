import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { UsersModule } from '../users/users.module';
import { RequestsEntity } from '../users/entities/requests.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/user.entity';
import { FriendsEntity } from '../users/entities/friends.entity';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService, RequestsEntity, FriendsEntity],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UsersEntity, RequestsEntity, FriendsEntity]),
  ],
})
export class RequestsModule {}
