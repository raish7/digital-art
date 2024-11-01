import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [CloudinaryModule, DatabaseModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
