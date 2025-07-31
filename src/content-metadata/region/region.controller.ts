import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createRegion(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllRegions(): Promise<Region[]> {
    return this.regionService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findRegionById(@Param('id') id: number): Promise<Region> {
    return this.regionService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateRegion(
    @Param('id') id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<void> {
    return this.regionService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteRegion(@Param('id') id: number): Promise<void> {
    return this.regionService.remove(id);
  }
}
