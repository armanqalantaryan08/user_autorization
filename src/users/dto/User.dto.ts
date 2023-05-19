import { ApiProperty } from '@nestjs/swagger';

export class User_DTO {
  @ApiProperty({
    example: '3a474ef9-8350-4c04-b6bd-8d171a417c60',
    description: "User's uuid",
  })
  uuid: string;

  @ApiProperty({ example: 'Mike', description: "User's name" })
  name: string;

  @ApiProperty({ example: 'Ross', description: "User's surname" })
  surname: string;

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  email: string;
}
