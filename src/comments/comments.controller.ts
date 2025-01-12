import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: Prisma.CommentCreateInput) {
    return this.commentsService.create(createCommentDto);
  }

  @Post('reply')
  reply(@Body() createCommentDto: Prisma.CommentCreateInput) {
    return this.commentsService.reply(createCommentDto)
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('user/:id')
  findCommentsByUser(@Param('id') id: string) {
    return this.commentsService.findCommentsByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
