import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request_ReqBody_DTO } from './dto/Request.ReqBody.dto';
import { Request_ReqParam_DTO } from './dto/Request.ReqParam.dto';

@ApiTags('Requests')
@ApiBearerAuth()
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  //send another user friend request-----------------------
  @ApiOperation({ summary: 'Send friend Request' })
  @UseGuards(JwtAuthGuard)
  @Post('request')
  sendFriendRequest(@Body() body: Request_ReqParam_DTO, @Req() req) {
    return this.requestsService.sendFriendRequest(req.user.uuid, body.uuid);
  }

  //get all incoming friend requests---------------------
  @ApiOperation({ summary: 'Get Requests' })
  @UseGuards(JwtAuthGuard)
  @Get('/request')
  getRequests(@Req() req) {
    return this.requestsService.getRequests(req.user.uuid);
  }
  //respond to request------------------------------------
  @ApiOperation({ summary: 'Respond to Request' })
  @UseGuards(JwtAuthGuard)
  @Patch('request')
  respondRequest(@Body() args: Request_ReqBody_DTO, @Req() req) {
    return this.requestsService.respondRequest(args, req.user.uuid);
  }
}
