import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LlamaService } from './llama.service';
import { CreateLlamaDto } from './dto/create-llama.dto';
import { UpdateLlamaDto } from './dto/update-llama.dto';

@Controller('llama')
export class LlamaController {
  constructor(private readonly llamaService: LlamaService) {}

  @Post('avatar')
  createImage(@Body() imagePrompt: string) {
    return this.llamaService.createImage(imagePrompt);
  }

  @Post('description')
  createDescription(@Body() descriptionPrompt: string) {
    return this.llamaService.generateDescription(descriptionPrompt);
  }

  @Get()
  findAll() {
    return this.llamaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.llamaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLlamaDto: UpdateLlamaDto) {
    return this.llamaService.update(+id, updateLlamaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.llamaService.remove(+id);
  }
}
