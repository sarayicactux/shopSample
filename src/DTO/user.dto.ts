import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  mobile: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;
}
export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;
}
