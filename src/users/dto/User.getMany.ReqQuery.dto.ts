import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class User_getMany_ReqQuery_DTO {
  @ApiProperty({ example: 'Mike', description: "User's name", required: false })
  @IsString({ message: 'Must be a string' })
  @Length(3, 16, { message: 'length must be from 3 to 16' })
  name!: string | undefined;

  @ApiProperty({
    example: 'Ross',
    description: "User's surname",
    required: false,
  })
  @IsString({ message: 'Must be a string' })
  @Length(3, 16, { message: 'length must be from 3 to 16' })
  surname!: string | undefined;

  @ApiProperty({ example: 29, description: "User's surname", required: false })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  @Min(1)
  @Max(100)
  age!: number | undefined;
}
