import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContentMetadataModule } from './content-metadata/content-metadata.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { Genre } from './content-metadata/genre/entities/genre.entity';
import { Language } from './content-metadata/language/entities/language.entity';
import { TmdbModule } from './tmdb/tmdb.module';
import { Region } from './content-metadata/region/entities/region.entity';
import { Certification } from './content-metadata/certification/entities/certification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT ?? '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Genre, Language, Region, Certification],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      subscribers: [],
      migrations: [],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
    AuthModule,
    UsersModule,
    TmdbModule,
    ContentMetadataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
