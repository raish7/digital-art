import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PurchaseService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createPurchaseDto: Prisma.PurchaseCreateInput) {
    const { amount, buyer, artworks, pidx } = createPurchaseDto
    return this.databaseService.purchase.create({
      data: {
        pidx,
        amount,
        buyer: {
          connect: {
            id: +buyer
          }
        },
        artworks: {
          create: (artworks as any[]).map((artworkId) => ({
            artwork: { connect: { id: artworkId } },
          })),
        },
      }
    })
  }

  findAll() {
    return this.databaseService.purchase.findMany({
      include: {
        buyer: {
          select:{
            id: true,
            name: true,
          }
        },
        artworks: {
          include: {
            artwork: {
              include: {
                images: true
              }
            }
          }
        }
      }
    })
  }

  findPurchaseByCustomer(id: number) {
    return this.databaseService.purchase.findMany({
      where: {
        buyer: {
          id
        }
      },
      include: {
        buyer: {
          select:{
            id: true,
            name: true,
          }
        },
        artworks: {
          include: {
            artwork: {
              include: {
                images: true,
                artist: {
                  select: {
                    id: true,
                    name: true,
                    username: true
                  }
                }
              }
            }
          },
        }
      }
    })
  }

  findPurchaseByArtist(id: number) {
    // return this.databaseService.purchase.findMany({
    //   where: {
    //     artworks: {
    //       some: {
    //         artistId: id
    //       }
    //     }
    //   },
    //   include: {
    //     buyer: {
    //       select:{
    //         id: true,
    //         name: true,
    //       }
    //     },
    //     artwork: {
    //       include: {
    //         artist: {
    //           select: {
    //             id: true,
    //             name: true,
    //           }
    //         }
    //       }
    //     }
    //   }
    // })
  }

  findOne(id: number) {
    return this.databaseService.purchase.findUnique({
      where: {
        id,
      }
    })
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  updateStatus(pidx: string, updatePurhcaseDto: Prisma.PurchaseUpdateInput) {
    const {amount, paymentStatus} = updatePurhcaseDto;
    return this.databaseService.purchase.update({
      where: {
        pidx
      },
      data:{
        amount,
        paymentStatus
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
