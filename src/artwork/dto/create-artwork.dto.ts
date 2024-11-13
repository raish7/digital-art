import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateArtworkDto implements Prisma.ArtworkCreateInput {
  @ApiProperty({ description: 'Title of the artwork', example: 'Sunset Landscape' })
  title: string;

  @ApiProperty({ description: 'Description of the artwork', example: 'A beautiful sunset over the mountains.' })
  description: string;

  @ApiProperty({ description: 'Price of the artwork', example: 150.00 })
  price: number;

  @ApiProperty({ description: 'Artist ID associated with the artwork', example: 1 })
  artist: Prisma.UserCreateNestedOneWithoutArtworksInput;

  @ApiProperty({ description: 'Array of image IDs related to the artwork', example: [1, 2, 3] })
  images?: Prisma.ImageCreateNestedManyWithoutArtworkInput;

  @ApiProperty({ description: 'Array of category IDs associated with the artwork', example: [1, 2, 3] })
  category?: Prisma.CategoryOnArtworkCreateNestedManyWithoutArtworkInput;
  // Add other properties as needed
}
