import { Prisma } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto: Prisma.WishlistCreateInput) {
    return this.wishlistService.create(createWishlistDto);
  }

  // @Get()
  // findAll() {
  //   return this.wishlistService.findAll();
  // }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findWishlistByUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistService.update(+id, updateWishlistDto);
  }

  @Delete()
  remove(@Body() payload: { userId: string, artworkId: number}) {
    return this.wishlistService.remove(payload);
  }
}
