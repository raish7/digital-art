import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ImagesService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private databaseService: DatabaseService,
  ) {}
  async create(files: Express.Multer.File[]) {
    try {
      const uploadedImages = [];
      for (const file of files) {
        const uploadResult = await this.cloudinaryService.uploadFile(file); // Upload to Cloudinary
        console.log('uploadresult>>>>>>', uploadResult)
        const imageUrl = uploadResult.secure_url; // Get the Cloudinary URL from the response
  
        // Save each uploaded image URL to the database
        const savedImage = await this.databaseService.image.create({
          data: {
            url: imageUrl,
            altText: 'IMG_NEW',
          },
        });
        uploadedImages.push(savedImage);
      }
      return uploadedImages;
    } catch (error: any) {
      throw error;
    }
  }

  findAll() {
    return this.databaseService.image.findMany({
      include: {
        artwork: {
          include: {
            artist: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
