import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { RequestsEntity } from './entities/requests.entity';
import { FriendsEntity } from './entities/friends.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RequestsEntity, FriendsEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersEntity, RequestsEntity, FriendsEntity],
  exports: [UsersService],
})
export class UsersModule {}
