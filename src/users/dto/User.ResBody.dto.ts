import { User_DTO } from './User.dto';
import { ApiProperty } from '@nestjs/swagger';

export class User_ResBody_DTO {
  @ApiProperty({ description: 'User' })
  user: User_DTO;
}
