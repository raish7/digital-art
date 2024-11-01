import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.databaseService.category.create({
      data: createCategoryDto
    })
  }

  async findAll() {
    return this.databaseService.category.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.category.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.databaseService.category.update({
      where: {
        id
      },
      data: updateCategoryDto
    })
  }

  async remove(id: number) {
    return this.databaseService.category.delete({
      where: {
        id
      }
    })
  }
}
