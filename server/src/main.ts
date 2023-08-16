import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { configSwagger } from '@/configs';
import { HttpResponseInterceptor } from '@/common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('API_PORT');
  const prefix = configService.get<string>('API_PREFIX');

  app.setGlobalPrefix(prefix);
  app.enableCors();
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  configSwagger(app);
  await app.listen(port);
  return port;
}

bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
});
