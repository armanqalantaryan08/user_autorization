import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class Request_ReqBody_DTO {
  @ApiProperty({
    example: '8a474ef9-8350-4c04-b6bd-8d121a417c60',
    description: "User's uuid",
  })
  @IsString({ message: 'Must be a string' })
  request_uuid: string;

  @ApiProperty({ example: true, description: 'accept or decline request' })
  @IsBoolean()
  accept: boolean;
}
