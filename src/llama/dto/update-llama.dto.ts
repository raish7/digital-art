import { PartialType } from '@nestjs/swagger';
import { CreateLlamaDto } from './create-llama.dto';

export class UpdateLlamaDto extends PartialType(CreateLlamaDto) {}
