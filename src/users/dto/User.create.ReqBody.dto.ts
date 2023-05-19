import { ApiProperty } from '@nestjs/swagger';
import { User_DTO } from './User.dto';

export class create_User_DTO {
  @ApiProperty({ example: 'Mike', description: "User's name" })
  name: string;

  @ApiProperty({ example: 'Ross', description: "User's surname" })
  surname: string;

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  email: string;

  @ApiProperty({ example: 'AAAaaa000', description: "User's Password" })
  password: string;
}
