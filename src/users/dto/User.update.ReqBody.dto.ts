import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { User_DTO } from './User.dto';

export class User_Update_ReqBody_DTO extends User_DTO {
  @ApiProperty({ example: 'AAAaaa000', description: "User's Password" })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Password length must be from 4 to 16' })
  password: string;
}
