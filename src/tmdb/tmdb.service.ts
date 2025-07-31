import { Injectable } from '@nestjs/common';
import { CreateTmdbDto } from './dto/create-tmdb.dto';
import { UpdateTmdbDto } from './dto/update-tmdb.dto';

@Injectable()
export class TmdbService {
  create(createTmdbDto: CreateTmdbDto) {
    return 'This action adds a new tmdb';
  }

  findAll() {
    return `This action returns all tmdb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tmdb`;
  }

  update(id: number, updateTmdbDto: UpdateTmdbDto) {
    return `This action updates a #${id} tmdb`;
  }

  remove(id: number) {
    return `This action removes a #${id} tmdb`;
  }
}
