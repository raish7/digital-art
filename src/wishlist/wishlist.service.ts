import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WishlistService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createWishlistDto: Prisma.WishlistCreateInput) {
    return this.databaseService.wishlist.create({
      data: {
        user: {
          connect: {
            id: +createWishlistDto.user
          }
        },
        artwork: {
          connect: {
            id: +createWishlistDto.artwork
          }
        }
      }
    })
  }

  findWishlistByUser(id: number) {
    return this.databaseService.wishlist.findMany({
      where: {
        id
      },
      include: {
        artwork: {
          include: {
            artist: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(payload: { userId: string, artworkId: number}) {
    return this.databaseService.wishlist.delete({
      where: {
        userId_artworkId: {
          userId: +payload.userId,
          artworkId: +payload.artworkId
        }
      }
    })
  }
}
