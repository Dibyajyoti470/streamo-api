import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateCertificationDto } from './create-certification.dto';

export class BulkCreateCertificationsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCertificationDto)
  certifications: CreateCertificationDto[];
}
