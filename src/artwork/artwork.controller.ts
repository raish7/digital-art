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
  UseGuards,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('artwork')
@ApiTags('Artwork')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new artwork' })
  @ApiResponse({
    status: 201,
    description: 'The artwork has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createArtworkDto: CreateArtworkDto) {
    return this.artworkService.create(createArtworkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all artworks' })
  @ApiQuery({
    name: 'artistId',
    required: false,
    description: 'Filter by artist ID',
  })
  @ApiQuery({
    name: 'priceSortBy',
    required: false,
    description: 'Sort by price (asc or desc)',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter by category ID',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort by most viewed',
  })
  findAll(
    @Query('artistId') artistId: string,
    @Query('priceSortBy') priceSortBy: string,
    @Query('category') category: string,
    @Query('sortBy') sortBy: string,
  ) {
    return this.artworkService.findAll(
      +artistId,
      priceSortBy,
      +category,
      sortBy,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a single artwork by ID' })
  findOne(@Param('id') id: string) {
    return this.artworkService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing artwork' })
  updateArtwork(
    @Param('id') id: string,
    @Body() updateArtworkDto: UpdateArtworkDto,
  ) {
    return this.artworkService.update(+id, updateArtworkDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArtworkDto: UpdateArtworkDto) {
  //   return this.artworkService.update(+id, updateArtworkDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing artwork' })
  remove(@Param('id') id: string) {
    return this.artworkService.remove(+id);
  }
}
