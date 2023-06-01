import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class Login_ReqBody_DTO {
  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  email: string;

  @ApiProperty({ example: 'AAAaaa000', description: "User's Password" })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Password length must be from 4 to 16' })
  password: string;
}
