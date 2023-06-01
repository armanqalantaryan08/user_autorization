import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class User_getByEmail_ResBody_DTO {
  @ApiProperty({
    example: '3a474ef9-8350-4c04-b6bd-8d171a417c60',
    description: "User's uuid",
  })
  uuid: string;

  @ApiProperty({ example: 'Mike', description: "User's name" })
  @IsString({ message: 'Must be a string' })
  @Length(3, 16, { message: 'length must be from 3 to 16' })
  name: string | undefined;

  @ApiProperty({ example: 'Ross', description: "User's surname" })
  @IsString({ message: 'Must be a string' })
  @Length(3, 16, { message: 'length must be from 3 to 16' })
  surname: string | undefined;

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  email: string | undefined;

  @ApiProperty({ example: 29, description: "User's surname" })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  @Min(1)
  @Max(100)
  age: number;

  @ApiProperty({ example: 'AAAaaa000', description: "User's Password" })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Password length must be from 4 to 16' })
  password: string;
}
