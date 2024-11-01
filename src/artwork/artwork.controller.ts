import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Prisma } from '@prisma/client';

@Controller('artwork')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Post()
  create(@Body() createArtworkDto: Prisma.ArtworkCreateInput) {
    return this.artworkService.create(createArtworkDto);
  }

  @Get()
  findAll(
    @Query('artistId') artistId: string,
    @Query('priceSortBy') priceSortBy: string,
    @Query('category') category: string,
  ) {
    return this.artworkService.findAll(+artistId, priceSortBy, +category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artworkService.findOne(+id);
  }

  @Put(':id')
  updateArtwork(
    @Param('id') id: string,
    @Body() updateArtworkDto: Prisma.ArtworkUpdateInput,
  ) {
    return this.artworkService.update(+id, updateArtworkDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArtworkDto: UpdateArtworkDto) {
  //   return this.artworkService.update(+id, updateArtworkDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artworkService.remove(+id);
  }
}
