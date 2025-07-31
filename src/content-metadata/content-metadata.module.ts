import { Module } from '@nestjs/common';
import { GenreModule } from './genre/genre.module';
import { LanguageModule } from './language/language.module';
import { CertificationModule } from './certification/certification.module';
import { ImageModule } from './image/image.module';
import { RegionModule } from './region/region.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    GenreModule,
    LanguageModule,
    CertificationModule,
    ImageModule,
    RegionModule,
  ],
})
export class ContentMetadataModule {}
