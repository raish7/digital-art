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
    console.log('category', category);
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
          (category as any[])?.length > 0
            ? {
                create: (category as any[]).map((categoryId: number) => ({
                  category: {
                    connect: { id: +categoryId },
                  },
                })),
              }
            : undefined,
      },
    });
    return response;
  }

  findAll(artistId?: number, priceSortBy?: any, category ?: number) {
    return this.databaseService.artwork.findMany({
      where: {
        artist: {
          id: artistId || undefined,
        },
        category: {
          some: {
            categoryId: category || undefined,
          }
        }
      },
      orderBy: {
        price: priceSortBy || undefined,
      },
      include: {
        artist: true,
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

  findOne(id: number) {
    return this.databaseService.artwork.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        images: true,
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
    return `This action removes a #${id} artwork`;
  }
}
