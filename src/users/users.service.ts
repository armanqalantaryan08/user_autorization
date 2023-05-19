import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { create_User_DTO } from './dto/User.create.ReqBody.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { User_DTO } from './dto/User.dto';
import { User_Update_ReqBody_DTO } from './dto/User.update.ReqBody.dto';
import { User_Login_ReqBody_DTO } from './dto/User.login.ReqBody.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User_getByEmail_ResBody_DTO } from './dto/User.getByEmail.ResBody.dto';
import { User_ReqParam_DTO } from './dto/User.ReqParam.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
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
        email: user.email,
      };
    });
  }

  private async _isUnique(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException(
        'User with such email or nickname already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  private async _validateAndGetUser(
    args: User_Login_ReqBody_DTO,
  ): Promise<User_DTO> {
    const user = await this.getByEmail(args.email);
    if (!user) {
      throw new HttpException(
        'User with such email not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const password_equals = await bcrypt.compare(args.password, user.password);
    if (password_equals) {
      return user;
    }
    throw new HttpException('Wrong password', HttpStatus.NOT_ACCEPTABLE);
  }

  private async _generateToken(user: User_DTO) {
    const payload = {
      name: user.name,
      surname: user.surname,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async create(args: create_User_DTO): Promise<string> {
    if (!this._validateEmail(args.email)) {
      throw new HttpException(
        'Invalid email format',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    await this._isUnique(args.email);
    const uuid = randomUUID();
    const hashed_password = await bcrypt.hash(args.password, 5);
    const user = new UsersEntity(uuid);

    user.email = args.email;
    user.password = hashed_password;
    user.name = args.name;
    user.surname = args.surname;
    user.updated_at = new Date();

    await this.userRepository.save(user);
    return 'New User successfully added';
  }

  async login(args: User_Login_ReqBody_DTO) {
    const user = await this._validateAndGetUser(args);
    return await this._generateToken(user);
  }

  async getAll() {
    return await this.userRepository.find({
      where: {
        deleted_at: IsNull(),
      },
    });
  }

  async getById(id: string): Promise<User_DTO> {
    return await this.userRepository.findOne({
      where: {
        uuid: id,
        deleted_at: IsNull(),
      },
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
        deleted_at: IsNull(),
      },
    });
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
