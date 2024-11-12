import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InterceptorsInterceptor } from './interceptors/interceptors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new InterceptorsInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
