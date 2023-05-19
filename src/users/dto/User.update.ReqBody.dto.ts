import { ApiProperty } from '@nestjs/swagger';

export class User_Update_ReqBody_DTO {
  @ApiProperty({ example: 'Mike', description: "User's name" })
  name: string | undefined;

  @ApiProperty({ example: 'Ross', description: "User's surname" })
  surname: string | undefined;

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  email: string | undefined;

  @ApiProperty({ example: 'AAAaaa000', description: "User's Password" })
  password: string;
}
