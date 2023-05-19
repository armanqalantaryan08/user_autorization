import { ApiProperty } from '@nestjs/swagger';

export class User_Login_ReqBody_DTO {
  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  email: string;

  @ApiProperty({ example: 'AAAaaa000', description: "User's Password" })
  password: string;
}
