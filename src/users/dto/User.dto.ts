import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class User_DTO {
  @ApiProperty({
    example: '3a474ef9-8350-4c04-b6bd-8d171a417c60',
    description: "User's uuid",
  })
  @IsString({ message: 'Must be a string' })
  uuid: string;

  @ApiProperty({ example: 'Mike', description: "User's name" })
  name: string;

  @ApiProperty({ example: 'Ross', description: "User's surname" })
  surname: string;

  @ApiProperty({ example: 29, description: "User's surname" })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  @Min(1)
  @Max(100)
  age: number;

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  email: string;
}
