import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoModule } from 'src/user-info/user-info.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),UserInfoModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
