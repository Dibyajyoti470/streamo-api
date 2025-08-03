import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ContentImageType {
  BANNER = 'banner',
  POSTER = 'poster',
  BACKDROP = 'backdrop',
  LOGO = 'logo',
  THUMBNAIL = 'thumbnail',
}

export enum EntityType {
  CONTENT = 'content',
  SEASON = 'season',
  EPISODE = 'episode',
}

@Entity()
export class ContentImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'external_id', unique: true })
  externalId: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt: string;

  @OneToMany(
    () => ContentImageAssociation,
    (association) => association.contentImage,
  )
  associations: ContentImageAssociation[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity()
export class ContentImageAssociation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ContentImage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_image_id' })
  contentImage: ContentImage;

  @Column({ name: 'entity_type', type: 'enum', enum: EntityType })
  entityType: EntityType;

  @Column({ name: 'entity_id' })
  entityId: number;

  @Column({ name: 'image_type', type: 'enum', enum: ContentImageType })
  imageType: ContentImageType;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
