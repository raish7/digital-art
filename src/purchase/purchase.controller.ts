import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Prisma } from '@prisma/client';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@Body() createPurchaseDto: Prisma.PurchaseCreateInput) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get('customer/:id')
  findPurchaseByCustomer(@Param('id') id: string) {
    return this.purchaseService.findPurchaseByCustomer(+id);
  }

  @Get('artist/:id')
  findPurchaseByArtist(@Param('id') id: string) {
    return this.purchaseService.findPurchaseByArtist(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
