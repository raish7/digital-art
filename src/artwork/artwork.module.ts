import { Module } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkController } from './artwork.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtworkController],
  providers: [ArtworkService],
})
export class ArtworkModule {}
