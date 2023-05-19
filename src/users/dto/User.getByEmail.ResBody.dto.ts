import { ApiProperty } from '@nestjs/swagger';

export class User_getByEmail_ResBody_DTO {
  @ApiProperty({
    example: '3a474ef9-8350-4c04-b6bd-8d171a417c60',
    description: "User's uuid",
  })
  uuid: string;
  @ApiProperty({ example: 'Mike', description: "User's name" })
  name: string | undefined;

  @ApiProperty({ example: 'Ross', description: "User's surname" })
  surname: string | undefined;

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  email: string | undefined;

  @ApiProperty({ example: 'AAAaaa000', description: "User's Password" })
  password: string;
}
