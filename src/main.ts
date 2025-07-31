import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseTransformInterceptor } from './shared/interceptors/response-transform.interceptor';
import { GlobalHttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  const reflector = app.get<Reflector>(Reflector);

  app.useGlobalInterceptors(new ResponseTransformInterceptor(reflector));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
