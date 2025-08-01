import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { Repository } from 'typeorm';
import { Region } from '../region/entities/region.entity';

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async createCertification(
    createCertificationDto: CreateCertificationDto,
  ): Promise<Certification> {
    const existingCert = await this.certificationRepository.findOne({
      where: { name: createCertificationDto.code },
    });

    if (existingCert) {
      throw new ConflictException('Certification already exists');
    }

    const newCert = this.certificationRepository.create({
      ...createCertificationDto,
      region: { id: createCertificationDto.regionId },
    });

    return await this.certificationRepository.save(newCert);
  }

  findAllCertifications(): Promise<Certification[]> {
    return this.certificationRepository.find({ order: { code: 'asc' } });
  }

  async findCertificationById(id: number): Promise<Certification> {
    const certification = await this.certificationRepository.findOne({
      where: { id },
    });

    if (!certification) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }

    return certification;
  }

  async updateCertification(
    id: number,
    updateCertificationDto: UpdateCertificationDto,
  ) {
    const certification = await this.certificationRepository.findOne({
      where: { id },
    });

    if (!certification) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }

    let region: Region | null = null;

    if (updateCertificationDto.regionId) {
      region = await this.regionRepository.findOne({
        where: { id: updateCertificationDto.regionId },
      });

      if (!region) {
        throw new BadRequestException(
          `Region with ID ${updateCertificationDto.regionId} does not exist`,
        );
      }
    }

    delete updateCertificationDto.regionId;

    const updatePayload: Partial<Certification> = {
      ...updateCertificationDto,
    };

    if (region) {
      updatePayload.region = region;
    }

    const updated = this.certificationRepository.merge(
      certification,
      updatePayload,
    );

    await this.certificationRepository.save(updated);
  }

  async deleteCertification(id: number) {
    const certification = await this.findCertificationById(id);

    if (!certification) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }

    await this.certificationRepository.remove(certification);
  }
}
