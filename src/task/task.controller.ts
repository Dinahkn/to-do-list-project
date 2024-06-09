import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(":userId")
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Param("userId") userId : number) {
    return this.taskService.create(createTaskDto,Number(userId));
  }


  @Get("/getAll/:userId")
  getAllTasks(@Param("userId") userId : number) {
    return this.taskService.getAllTasks(Number(userId));
  }

  @Get("/getTask/:taskId")
  getTaskById(@Param("taskId") taskId : number){
    return this.taskService.getTaskById(Number(taskId));

  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.taskService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(Number(id));
  }
}
