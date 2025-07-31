import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nativeName: string;
}
