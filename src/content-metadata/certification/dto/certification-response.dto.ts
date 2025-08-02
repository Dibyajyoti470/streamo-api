import { Exclude, Expose, Transform } from 'class-transformer';
import { Region } from 'src/content-metadata/region/entities/region.entity';

@Exclude()
export class CertificationResponseDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  ageLimit: number;

  @Expose()
  isActive: boolean;

  @Expose()
  @Transform(
    ({ obj }: { obj: { region?: { id?: number } } }): number | undefined =>
      obj.region?.id,
  )
  regionId: number;

  region: Region;
}
