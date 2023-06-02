import { User_DTO } from './User.dto';
import { ApiProperty } from '@nestjs/swagger';

export class User_GetFriends_ResBody_DTO {
  @ApiProperty({ description: 'Users ', isArray: true, type: User_DTO })
  friends: Array<User_DTO>;
}
