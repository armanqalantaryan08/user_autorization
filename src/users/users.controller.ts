import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User_create_ReqBody_DTO } from './dto/User.create.ReqBody.dto';
import { User_Update_ReqBody_DTO } from './dto/User.update.ReqBody.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User_getMany_ReqQuery_DTO } from './dto/User.getMany.ReqQuery.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //create new user---------------------------------
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200 })
  @Post()
  create(@Body() createUserDto: User_create_ReqBody_DTO) {
    return this.usersService.create(createUserDto);
  }
  //get all users------------------------------------
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query() body: User_getMany_ReqQuery_DTO) {
    return this.usersService.getAll(body);
  }

  @ApiOperation({ summary: 'Get User By Id' })
  @Get('friends')
  @UseGuards(JwtAuthGuard)
  getFriends(@Req() req) {
    return this.usersService.getFriends(req.user.uuid);
  }

  //get user by it`s id--------------------------------
  @ApiOperation({ summary: 'Get User By Id' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  //update user`s data---------------------------------
  @ApiOperation({ summary: 'Update user`s data' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() args: User_Update_ReqBody_DTO) {
    return this.usersService.update(id, args);
  }

  //remove user----------------------------------------
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
