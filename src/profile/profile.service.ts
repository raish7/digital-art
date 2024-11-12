import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProfileService {
  constructor(private databaseService: DatabaseService) {}
  create(createProfileDto: Prisma.ProfileCreateInput) {
    return this.databaseService.profile.create({
      data: {
        bio: createProfileDto.bio,
        profilePic: createProfileDto.profilePic,
        user: {
          connect: {
            id: +createProfileDto.user
          }
        }
      }
    })
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return this.databaseService.profile.findUnique({
      where: {
        userId: id
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            id: true
          }
        }
      }
    })
  }

  update(id: number, updateProfileDto: Prisma.ProfileUpdateInput) {
    return this.databaseService.profile.update({
      where: {
        userId: id
      },
      data: {
        bio: updateProfileDto.bio,
        profilePic: updateProfileDto.profilePic,
        user: {
          connect: {
            id: +updateProfileDto.user
          }
        }
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
