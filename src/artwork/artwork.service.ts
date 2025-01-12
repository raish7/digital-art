import { Injectable } from '@nestjs/common';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { Image } from 'src/images/entities/image.entity';
import { connect } from 'http2';

@Injectable()
export class ArtworkService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createArtworkDto: Prisma.ArtworkCreateInput) {
    const { title, description, price, images, artist, category } =
      createArtworkDto;
    console.log('category', createArtworkDto);
    const response = this.databaseService.artwork.create({
      data: {
        title,
        description,
        price,
        artist: {
          connect: { id: +artist },
        },
        images: {
          connect: (images as any[]).map((imageId: number) => ({
            id: imageId,
          })),
        },
        category:
          (category as number[])?.length > 0
            ? {
                create: (category as any[]).map((categoryId) => ({
                  category: {
                    connect: { id: categoryId },
                  },
                })),
              }
            : undefined,
      },
    });
    return response;
  }

  findAll(
    artistId?: number,
    priceSortBy?: any,
    category?: number,
    sortBy?: any,
  ) {
    return this.databaseService.artwork.findMany({
      where: {
        ...(artistId ? { artistId } : {}), // Include artistId filter if artistId is provided
        ...(category ? { category: { some: { categoryId: category } } } : {}), // Include category filter if category is provided
      },
      orderBy: [
        ...(priceSortBy ? [{ price: priceSortBy }] : []), // Order by price if priceSortBy is provided
        ...(sortBy ? [{ views: sortBy }] : []), // Order by views if sortBy is provided
      ],
      include: {
        artist: {
          select: {
            username: true,
            name: true,
            id: true,
          },
        },
        images: true,
        category: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        comments: {
          select: {
            content: true,
            createdAt: true,
            updatedAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    await this.databaseService.artwork.update({
      where: {
        id,
      },
      data: {
        views: { increment: 1 },
      },
    });
    return this.databaseService.artwork.findUnique({
      where: {
        id,
      },
      include: {
        artist: {
          select: {
            username: true,
            name: true,
            id: true,
          },
        },
        images: true,
        category: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        comments: {
          where: {
            parentId: null,
          },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                profile: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    username: true,
                    name: true,
                    profile: true,
                  },
                },
                replies: {
                  include: {
                    author: {
                      select: {
                        id: true,
                        username: true,
                        name: true,
                        profile: true,
                      },
                    },
                    replies: {
                      include: {
                        author: {
                          select: {
                            id: true,
                            username: true,
                            name: true,
                            profile: true,
                          }
                        }
                      }
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateArtworkDto: Prisma.ArtworkUpdateInput) {
    const { title, description, price, images, artist } = updateArtworkDto;
    return this.databaseService.artwork.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        price,
        artist: {
          connect: { id: +artist },
        },
        images: {
          connect: (images as any[]).map((imageId: number) => ({
            id: imageId,
          })),
        },
      },
    });
  }

  remove(id: number) {
    return this.databaseService.artwork.delete({
      where: {
        id,
      },
    });
  }
}
