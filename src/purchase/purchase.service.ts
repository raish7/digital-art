import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PurchaseService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createPurchaseDto: Prisma.PurchaseCreateInput) {
    const { amount, buyer, artwork } = createPurchaseDto
    return this.databaseService.purchase.create({
      data: {
        amount,
        buyer: {
          connect: {
            id: +buyer
          }
        },
        artwork: {
          connect: {
            id: +artwork
          }
        }
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
        artwork: true
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
        artwork: {
          include: {
            artist: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    })
  }

  findPurchaseByArtist(id: number) {
    return this.databaseService.purchase.findMany({
      where: {
        artwork: {
          artist: {
            id
          }
        }
      },
      include: {
        buyer: {
          select:{
            id: true,
            name: true,
          }
        },
        artwork: {
          include: {
            artist: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    })
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

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
