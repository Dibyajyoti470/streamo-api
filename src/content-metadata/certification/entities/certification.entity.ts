import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Region } from 'src/content-metadata/region/entities/region.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 10 })
  @IsNotEmpty()
  code: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ name: 'age_limit', type: 'int', nullable: true })
  ageLimit: number;

  @ManyToOne(() => Region, (region) => region.certifications, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
