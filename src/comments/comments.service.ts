import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCommentDto: Prisma.CommentCreateInput) {
    return this.databaseService.comment.create({
      data: {
        content: createCommentDto.content,
        author: {
          connect: {
            id: +createCommentDto.author,
          }
        },
        artwork: {
          connect: {
            id: +createCommentDto.artwork
          }
        }
      }
    });
  }

  findAll() {
    return `This action returns all comments`;
  }

  findCommentsByUser(id: number) {
    return this.databaseService.comment.findMany({
      where: {
        authorId: +id
      },
      include: {
        artwork: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
