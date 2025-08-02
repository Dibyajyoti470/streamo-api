import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { Certification } from './entities/certification.entity';
import { CertificationResponseDto } from './dto/certification-response.dto';
import { plainToInstance } from 'class-transformer';
import { BulkCreateCertificationsDto } from './dto/bulk-create-certifications.dto';
import { SuccessMessage } from 'src/shared/decorators/success-message.decorator';

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCertification(
    @Body() createCertificationDto: CreateCertificationDto,
  ): Promise<Certification> {
    return this.certificationService.createCertification(
      createCertificationDto,
    );
  }

  @Post('/bulk')
  @HttpCode(HttpStatus.CREATED)
  @SuccessMessage('Certifications created successfully')
  createCertificationsInBulk(
    @Body() bulkCreateCertificationsDto: BulkCreateCertificationsDto,
  ): Promise<void> {
    return this.certificationService.createCertificationsInBulk(
      bulkCreateCertificationsDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllCertifications(): Promise<CertificationResponseDto[]> {
    const certifications =
      await this.certificationService.findAllCertifications();
    return plainToInstance(CertificationResponseDto, certifications, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findCertificationById(
    @Param('id') id: string,
  ): Promise<CertificationResponseDto> {
    const certification =
      await this.certificationService.findCertificationById(+id);
    return plainToInstance(CertificationResponseDto, certification, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCertification(
    @Param('id') id: string,
    @Body() updateCertificationDto: UpdateCertificationDto,
  ): Promise<void> {
    return this.certificationService.updateCertification(
      +id,
      updateCertificationDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteCertification(@Param('id') id: string): Promise<void> {
    return this.certificationService.deleteCertification(+id);
  }
}
