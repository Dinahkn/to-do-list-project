import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { JWTAuthGuard } from './auth/guard/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalGuards(new JWTAuthGuard());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
