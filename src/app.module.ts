import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true, envFilePath : [".local.env"]}),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService : ConfigService) =>({
        type: 'postgres',
        host: configService.get("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get("DATABASE_USERNAME"),
        password: configService.get("DATABASE_PASSWORD"),
        synchronize: configService.get<boolean>("DATABASE_SYNC"),
        logging: configService.get<boolean>("DATABASE_LOGGING"),
        database: configService.get("DATABASE_NAME"),
        entities : [__dirname + "/**/*.entity{.ts,.js}"]
      })
    }),
    TaskModule,
    UserInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
