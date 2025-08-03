import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentStatus, ContentType } from '../content.enum';
import { Language } from 'src/content-metadata/language/entities/language.entity';
import { Certificate } from 'crypto';
import { Certification } from 'src/content-metadata/certification/entities/certification.entity';
import { Genre } from 'src/content-metadata/genre/entities/genre.entity';
import { Region } from 'src/content-metadata/region/entities/region.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  slug: string;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 500, nullable: true })
  originalTitle: string;

  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ContentType })
  type: ContentType;

  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  @Index()
  releaseDate: Date;

  @Column({ name: 'duration_minutes', type: 'int', nullable: true })
  durationMinutes: number;

  @Column({ name: 'imdb_id', length: 20, nullable: true })
  @Index()
  imdbId: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  imdbRating: number;

  @Column({ name: 'meta_title', length: 255, nullable: true })
  metaTitle: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ name: 'is_premium', default: false })
  isPremium: boolean;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => Language, { nullable: false })
  @JoinColumn({ name: 'original_language_id' })
  originalLanguage: Language;

  @ManyToOne(() => Certificate, { nullable: false })
  @JoinColumn({ name: 'certification_id' })
  certification: Certification;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'content_genres',
    joinColumn: { name: 'content_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: Genre[];

  @ManyToMany(() => Language)
  @JoinTable({
    name: 'content_languages',
    joinColumn: { name: 'content_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'language_id', referencedColumnName: 'id' },
  })
  availableLanguages: Language[];

  @ManyToMany(() => Region)
  @JoinTable({
    name: 'content_regions',
    joinColumn: { name: 'content_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'region_id', referencedColumnName: 'id' },
  })
  availableRegions: Region[];

  @OneToMany(() => Season, (season) => season.content, { cascade: true })
  seasons: Season[];
}

@Entity()
@Index(['content', 'seasonNumber'], { unique: true })
@Index(['content', 'airDate'])
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'season_number', type: 'int' })
  seasonNumber: number;

  @Column({ length: 500 })
  title: string;

  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'air_date', type: 'date', nullable: true })
  airDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: string;

  @OneToMany(() => Episode, (episode) => episode.season, { cascade: true })
  episodes: Episode[];

  @ManyToOne(() => Content, (content) => content.seasons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
@Index(['content', 'seasonNumber', 'episodeNumber'])
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column({ name: 'episode_number', type: 'int' })
  episodeNumber: number;

  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'air_date', type: 'date', nullable: true })
  airDate: Date;

  @Column({ name: 'duration_minutes', type: 'int', nullable: true })
  durationMinutes: number;

  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Season, (season) => season.episodes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'season_id' })
  season: Season;
}
