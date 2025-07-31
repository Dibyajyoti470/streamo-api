import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly genreRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const existingGenre = await this.genreRepository.findOne({
      where: { name: createLanguageDto.name },
    });

    if (existingGenre) {
      throw new ConflictException('Language already exists');
    }

    return await this.genreRepository.save(createLanguageDto);
  }

  findAll(): Promise<Language[]> {
    return this.genreRepository.find({ order: { name: 'asc' } });
  }

  async findOne(id: number): Promise<Language> {
    const genre = await this.genreRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }

    return genre;
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<void> {
    const result = await this.genreRepository.update(id, updateLanguageDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);

    if (!genre) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }

    await this.genreRepository.remove(genre);
  }
}
