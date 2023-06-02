import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { RequestsEntity } from '../entities/requests.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Request_ReqBody_DTO } from './dto/Request.ReqBody.dto';
import { FriendsEntity } from '../entities/friends.entity';
import { UsersEntity } from '../entities/user.entity';

@Injectable()
export class RequestsService {
  constructor(
    private userService: UsersService,
    @InjectRepository(RequestsEntity)
    private requestRepository: Repository<RequestsEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(FriendsEntity)
    private friendsRepository: Repository<FriendsEntity>,
  ) {}

  async getRequests(uuid: string): Promise<Array<RequestsEntity>> {
    const reqs = await this.userRepository.find({
      where: {
        uuid: uuid,
        deleted_at: IsNull(),
      },
      relations: ['incomingRequests'],
    });

    console.log(reqs);
    return reqs[0].incomingRequests;
  }

  async sendFriendRequest(
    user_uuid: string,
    requestee_uuid: string,
  ): Promise<string> {
    const user = await this.userService.getByUuid(user_uuid);
    const requestingUser = await this.userService.getByUuid(requestee_uuid);
    const uuid = randomUUID();
    const entity = new RequestsEntity(uuid);
    entity.requester = user;
    entity.requestee = requestingUser;
    await this.requestRepository.save(entity);
    return 'Friend request sent';
  }

  async respondRequest(args: Request_ReqBody_DTO, uuid: string) {
    const req = await this.requestRepository.findOne({
      where: {
        uuid: args.request_uuid,
        deleted_at: IsNull(),
      },
      relations: ['requester', 'requestee'],
    });

    if (req.requestee.uuid === uuid) {
      if (args.accept === true) {
        const friends = new FriendsEntity(randomUUID());
        friends.user1 = req.requestee;
        friends.user2 = req.requester;
        req.deleted_at = new Date();
        await this.friendsRepository.save(friends);
      }
      await this.requestRepository.save(req);
    } else {
      throw new HttpException('Request does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
