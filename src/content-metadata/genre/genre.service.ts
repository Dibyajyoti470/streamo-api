import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const existingGenre = await this.genreRepository.findOne({
      where: { name: createGenreDto.name },
    });

    if (existingGenre) {
      throw new ConflictException('Genre already exists');
    }

    return await this.genreRepository.save(createGenreDto);
  }

  findAll(): Promise<Genre[]> {
    return this.genreRepository.find({ order: { name: 'asc' } });
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<void> {
    const result = await this.genreRepository.update(id, updateGenreDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    await this.genreRepository.remove(genre);
  }
}
