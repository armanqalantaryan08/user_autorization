import { ApiProperty } from '@nestjs/swagger';
import { User_DTO } from './User.dto';

export class create_User_DTO {
  @ApiProperty({ example: User_DTO, description: 'User data' })
  user: User_DTO;
}
