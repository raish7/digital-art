import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InterceptorsInterceptor } from './interceptors/interceptors.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new InterceptorsInterceptor())
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  app.enableCors({
    origin: allowedOrigins,
    credentials: false, // No cookies or credentials will be sent
  });
  const config = new DocumentBuilder()
  .setTitle('Digital Artwork API')
  .setDescription('The Digital Artwork API description')
  .setVersion('1.0')
  .build();
const documentFactory = SwaggerModule.createDocument(app, config);

// writeFileSync('./swagger-spec.json', JSON.stringify(documentFactory));

SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
