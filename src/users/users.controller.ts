import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { create_User_DTO } from './dto/User.create.ReqBody.dto';
import { User_Update_ReqBody_DTO } from './dto/User.update.ReqBody.dto';
import { User_Login_ReqBody_DTO } from './dto/User.login.ReqBody.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200 })
  @Post('register')
  register(@Body() createUserDto: create_User_DTO) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200 })
  @Post('login')
  login(@Body() createUserDto: User_Login_ReqBody_DTO) {
    return this.usersService.login(createUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Get('email/:email')
  getByEmail(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() args: User_Update_ReqBody_DTO) {
    return this.usersService.update(id, args);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
