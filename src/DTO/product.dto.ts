import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsInt,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  price: number;
}
export class UpdateProductDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  price: number;
}
