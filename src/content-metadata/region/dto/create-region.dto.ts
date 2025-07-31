import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
