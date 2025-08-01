import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from '../region/entities/region.entity';
import { Certification } from './entities/certification.entity';
import { CertificationController } from './certification.controller';
import { CertificationService } from './certification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Certification, Region])],
  controllers: [CertificationController],
  providers: [CertificationService],
})
export class CertificationModule {}
