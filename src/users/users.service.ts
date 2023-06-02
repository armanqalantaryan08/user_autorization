import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User_create_ReqBody_DTO } from './dto/User.create.ReqBody.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/user.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { User_DTO } from './dto/User.dto';
import { User_Update_ReqBody_DTO } from './dto/User.update.ReqBody.dto';
import { RequestsEntity } from '../entities/requests.entity';
import { FriendsEntity } from '../entities/friends.entity';
import { User_getMany_ReqQuery_DTO } from './dto/User.getMany.ReqQuery.dto';
import { IsNull, Repository } from 'typeorm';
import { User_GetMany_ResBody_DTO } from './dto/User.getMany.ResBody.dto';
import { User_GetFriends_ResBody_DTO } from './dto/User.getFriends.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(RequestsEntity)
    private requestRepository: Repository<RequestsEntity>,
    @InjectRepository(FriendsEntity)
    private friendRepository: Repository<FriendsEntity>,
  ) {}

  private _validateEmail(email: string): boolean {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
  }
  private async _transformUserToDto(
    users: Array<UsersEntity>,
  ): Promise<Array<User_DTO>> {
    return users.map((user) => {
      return {
        uuid: user.uuid,
        name: user.name,
        surname: user.surname,
        age: user.age,
        email: user.email,
      };
    });
  }

  async create(args: User_create_ReqBody_DTO): Promise<User_DTO> {
    if (!this._validateEmail(args.email)) {
      throw new HttpException(
        'Invalid email format',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const uuid = randomUUID();
    const hashed_password = await bcrypt.hash(args.password, 5);
    const user = new UsersEntity(uuid);

    user.email = args.email;
    user.password = hashed_password;
    user.name = args.name;
    user.surname = args.surname;
    user.age = args.age;
    user.updated_at = new Date();

    await this.userRepository.save(user);
    return (await this._transformUserToDto([user]))[0];
  }

  async getAll(
    args: User_getMany_ReqQuery_DTO,
  ): Promise<User_GetMany_ResBody_DTO> {
    const query = this.userRepository.createQueryBuilder('users').where({
      deleted_at: IsNull(),
    });

    if (args.name) {
      query.andWhere('users.name LIKE (:name)', {
        name: args.name + '%',
      });
    }

    if (args.surname) {
      query.andWhere('users.surname LIKE (:surname)', {
        surname: args.surname + '%',
      });
    }

    if (args.age) {
      query.andWhere('users.age =:age', { age: args.age });
    }

    const users = await query.getMany();

    return { users: await this._transformUserToDto(users) };
  }

  async getByUuid(uuid: string): Promise<UsersEntity> {
    const user = await this.userRepository.findOne({
      where: {
        uuid,
        deleted_at: IsNull(),
      },
    });
    return user;
  }

  async getById(id: string): Promise<User_DTO> {
    return (await this._transformUserToDto([await this.getByUuid(id)]))[0];
  }

  async getByEmail(email: string): Promise<UsersEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
        deleted_at: IsNull(),
      },
    });
  }

  async getFriends(uuid: string): Promise<User_GetFriends_ResBody_DTO> {
    console.log('uuid:', uuid);

    const query = this.userRepository.createQueryBuilder('user').innerJoin(
      FriendsEntity,
      'fr',
      `
      ((user.uuid = fr.user_uuid AND fr.friend_uuid = :uuid) OR (user.uuid = fr.friend_uuid AND fr.user_uuid = :uuid))`,
      { uuid },
    );

    const friends = await query.getRawMany();

    return { friends: await this._transformUserToDto(friends) };
  }

  async update(id: string, args: User_Update_ReqBody_DTO): Promise<User_DTO> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: id,
      },
    });

    if (args.name) {
      user.name = args.name;
    }
    if (args.surname) {
      user.surname = args.surname;
    }
    if (args.email) {
      user.email = args.email;
    }
    if (args.age) {
      user.age = args.age;
    }
    if (args.password) {
      user.password = await bcrypt.hash(args.password, 5);
    }
    await this.userRepository.save(user);

    return (await this._transformUserToDto([user]))[0];
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { uuid: id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.deleted_at = new Date();
    await this.userRepository.save(user);

    return 'User deleted successfully';
  }
}
