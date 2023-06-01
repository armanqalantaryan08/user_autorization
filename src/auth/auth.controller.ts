import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Login_ReqBody_DTO } from './dto/login.ReqBody.dto';
import { Register_ReqBody_DTO } from './dto/register.ReqBody.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() args: Login_ReqBody_DTO) {
    return this.authService.login(args);
  }

  @Post('/register')
  register(@Body() args: Register_ReqBody_DTO) {
    return this.authService.register(args);
  }
}
