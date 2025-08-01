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

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllCertifications(): Promise<Certification[]> {
    return this.certificationService.findAllCertifications();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findCertificationById(@Param('id') id: string): Promise<Certification> {
    return this.certificationService.findCertificationById(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCertification(
    @Param('id') id: number,
    @Body() updateCertificationDto: UpdateCertificationDto,
  ): Promise<void> {
    return this.certificationService.updateCertification(
      id,
      updateCertificationDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteCertification(@Param('id') id: number): Promise<void> {
    return this.certificationService.deleteCertification(id);
  }
}
