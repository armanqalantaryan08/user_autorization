import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Request_ReqParam_DTO {
  @ApiProperty({
    example: '8a474ef9-8350-4c04-b6bd-8d121a417c60',
    description: "User's uuid",
  })
  @IsString({ message: 'Must be a string' })
  uuid: string;
}
