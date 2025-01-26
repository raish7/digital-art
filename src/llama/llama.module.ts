import { Module } from '@nestjs/common';
import { LlamaService } from './llama.service';
import { LlamaController } from './llama.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LlamaController],
  providers: [LlamaService],
  imports: [HttpModule]
})
export class LlamaModule {}
