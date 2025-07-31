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
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllGenres(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findGenreById(@Param('id') id: number): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateGenre(
    @Param('id') id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<void> {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteGenre(@Param('id') id: number): Promise<void> {
    return this.genreService.remove(id);
  }
}
