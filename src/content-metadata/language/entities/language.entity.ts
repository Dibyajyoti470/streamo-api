import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 10 })
  code: string;

  @Column()
  name: string;

  @Column()
  nativeName: string;
}
