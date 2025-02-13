import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImagesModule } from './images/images.module';
import { ArtworkModule } from './artwork/artwork.module';
import { CategoriesModule } from './categories/categories.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CommentsModule } from './comments/comments.module';
import { ProfileModule } from './profile/profile.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { PaymentModule } from './payment/payment.module';
import { LlamaModule } from './llama/llama.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, CloudinaryModule, ImagesModule, ArtworkModule, CategoriesModule, PurchaseModule, CommentsModule, ProfileModule, WishlistModule, PaymentModule, LlamaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
