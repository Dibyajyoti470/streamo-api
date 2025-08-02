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
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createLanguage(@Body() createGenreDto: CreateLanguageDto): Promise<Language> {
    return this.languageService.create(createGenreDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllGenres(): Promise<Language[]> {
    return this.languageService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findGenreById(@Param('id') id: string): Promise<Language> {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateGenre(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateLanguageDto,
  ): Promise<void> {
    return this.languageService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteGenre(@Param('id') id: string): Promise<void> {
    return this.languageService.remove(+id);
  }
}
