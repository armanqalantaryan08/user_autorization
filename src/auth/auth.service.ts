import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Login_ReqBody_DTO } from './dto/login.ReqBody.dto';
import { User_DTO } from '../users/dto/User.dto';
import * as bcrypt from 'bcryptjs';
import { Register_ReqBody_DTO } from './dto/register.ReqBody.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async _validateAndGetUser(args: Login_ReqBody_DTO) {
    const user = await this.userService.getByEmail(args.email);
    const password_equals = await bcrypt.compare(args.password, user.password);
    if (user && password_equals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  async register(args: Register_ReqBody_DTO) {
    const email_check = await this.userService.getByEmail(args.email);
    if (email_check) {
      throw new HttpException(
        'User with such email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create({
      ...args,
    });
    return await this._generateToken(user);
  }

  private async _generateToken(user: User_DTO) {
    const payload = {
      uuid: user.uuid,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(args: Login_ReqBody_DTO) {
    const user = await this._validateAndGetUser(args);
    return await this._generateToken(user);
  }
}
