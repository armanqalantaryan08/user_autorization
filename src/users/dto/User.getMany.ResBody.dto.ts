import { User_DTO } from './User.dto';
import { ApiProperty } from '@nestjs/swagger';

export class User_GetMany_ResBody_DTO {
  @ApiProperty({ description: 'Users ', isArray: true, type: User_DTO })
  users: Array<User_DTO>;
}
