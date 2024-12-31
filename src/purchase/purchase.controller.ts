import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPurchaseDto: Prisma.PurchaseCreateInput) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('customer/:id')
  findPurchaseByCustomer(@Param('id') id: string) {
    return this.purchaseService.findPurchaseByCustomer(+id);
  }

  @UseGuards(AuthGuard)
  @Get('artist/:id')
  findPurchaseByArtist(@Param('id') id: string) {
    return this.purchaseService.findPurchaseByArtist(+id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('update-status/:pidx')
  updateStatus(@Param('pidx') pidx: string, @Body() updatePurchaseDto: Prisma.PurchaseUpdateInput) {
    return this.purchaseService.updateStatus(pidx, updatePurchaseDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
