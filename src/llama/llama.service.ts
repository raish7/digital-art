import { Injectable } from '@nestjs/common';
import { CreateLlamaDto } from './dto/create-llama.dto';
import { UpdateLlamaDto } from './dto/update-llama.dto';
import Together from 'together-ai';

const client = new Together({
  apiKey: process.env.TOGETHER_AI_KEY,
});

@Injectable()
export class LlamaService {
  async createImage(imagePrompt: any) {
    const response = await client.images.create({
      model: 'black-forest-labs/FLUX.1-dev',
      prompt: imagePrompt.userPrompt,
      width: 1024,
      height: 768,
      response_format: 'base64',
    });
    return response.data[0].b64_json;
  }

  async generateDescription(prompt: any) {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt.prompt,
        },
      ],
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
    });

    return response.choices[0].message.content;
  }

  findAll() {
    return `This action returns all llama`;
  }

  findOne(id: number) {
    return `This action returns a #${id} llama`;
  }

  update(id: number, updateLlamaDto: UpdateLlamaDto) {
    return `This action updates a #${id} llama`;
  }

  remove(id: number) {
    return `This action removes a #${id} llama`;
  }
}
