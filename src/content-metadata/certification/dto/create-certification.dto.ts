import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCertificationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  ageLimit?: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  regionId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
