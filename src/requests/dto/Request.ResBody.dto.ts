import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Request_ResBody_DTO {
  @ApiProperty({
    example: '8a474ef9-8350-4c04-b6bd-8d121a417c60',
    description: "Request's uuid",
  })
  @IsString({ message: 'Must be a string' })
  request_uuid: string;

  @ApiProperty({
    example: '8a474ef9-8350-4c04-b6bd-8d121a417c60',
    description: 'Requesters uuid',
  })
  @IsString({ message: 'Must be a string' })
  requester_uuid: string;
}
