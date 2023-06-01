import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User_create_ReqBody_DTO } from './dto/User.create.ReqBody.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { User_DTO } from './dto/User.dto';
import { User_Update_ReqBody_DTO } from './dto/User.update.ReqBody.dto';
import { RequestsEntity } from './entities/requests.entity';
import { FriendsEntity } from './entities/friends.entity';
import { User_getMany_ReqQuery_DTO } from './dto/User.getMany.ReqQuery.dto';

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

  private _validateEmail(email: string) {
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

  async getAll(args: User_getMany_ReqQuery_DTO) {
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
    return users;
  }

  async getByUuid(uuid: string) {
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

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
        deleted_at: IsNull(),
      },
    });
  }

  async getFriends(uuid: string) {
    console.log('uuid:', uuid);
    const friends = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .leftJoin('user.friends', 'fr')
      // .where('fr.user_uuid = user.uuid')
      // .orWhere('fr.friend_uuid = user.uuid')
      .orWhere('fr.friend_uuid = :uuid', {
        uuid: '3ef65571-236c-43b0-8e75-c1452c7e272c',
      })

      // .orWhere('fr.user_uuid = user.uuid')
      // .andWhere('fr.friend_uuid = :uuid', { uuid })
      // .leftJoin('user.friends', 'fra')
      // .where('fra.friend_uuid = :num', {
      //   num: '9e579f72-c1b1-4822-880f-c3f4cf06a8e0',
      // })
      // .andWhere('fra.user_uuid = :uuid', { uuid })

      // .leftJoin('user.friends', 'fr1')
      // .where('fr1.friend_uuid = user.uuid')
      // .orWhere('fr.friend_uuid = :uuid', { uuid })

      .getMany();
    return friends;

    // const friends1 = await this.friendRepository.find({
    //   where: {
    //     user: {
    //       uuid,
    //     },
    //   },
    //   relations: ['friend'],
    // });
    // const friends2 = await this.friendRepository.find({
    //   where: {
    //     friend: {
    //       uuid,
    //     },
    //   },
    //   relations: ['user'],
    // });
    // console.log('fr', friends1);
    // console.log('fr2', friends2);
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
