import { ApiProperty } from '@nestjs/swagger';

export class User_ReqParam_DTO {
  @ApiProperty({
    example: '8a474ef9-8350-4c04-b6bd-8d121a417c60',
    description: "User's uuid",
  })
  uuid: string;
}
