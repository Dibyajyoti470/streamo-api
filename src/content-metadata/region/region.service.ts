import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const existingGenre = await this.regionRepository.findOne({
      where: { name: createRegionDto.name },
    });

    if (existingGenre) {
      throw new ConflictException('Region already exists');
    }

    return await this.regionRepository.save(createRegionDto);
  }

  findAll(): Promise<Region[]> {
    return this.regionRepository.find({ order: { code: 'asc' } });
  }

  async findOne(id: number): Promise<Region> {
    const genre = await this.regionRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    return genre;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<void> {
    const result = await this.regionRepository.update(id, updateRegionDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    const region = await this.findOne(id);

    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    await this.regionRepository.remove(region);
  }
}
