import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(":userId")
  async create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Param("userId") userId: number) {
      try {
          return await this.taskService.create(createTaskDto, Number(userId));
      } catch (error) {
          throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
      }
  }


  @Get("/getAll/:userId")
  async getAllTasks(@Param("userId") userId : number) {
    try {
      const tasks = await this.taskService.getAllTasks(Number(userId));
      if (!tasks || tasks.length === 0) {
        console.log('i am inthe if');
        throw new HttpException('No tasks found for the given user', HttpStatus.NO_CONTENT);;// Renvoyer un message sans contenu avec le code 204 No Content
      }
      return tasks;
    } catch (notFoundError) {
      if (notFoundError instanceof HttpException && notFoundError.getStatus() === HttpStatus.NO_CONTENT) {
        throw notFoundError; // Renvoyer l'exception 204 No Content sans la modifier
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
  }

  @Get("/getTask/:taskId")
  async getTaskById(@Param("taskId") taskId : number){
    try {
      return await this.taskService.getTaskById(Number(taskId));
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch("/updateTask/:id")
  update(@Param('id') id: number) {
    try{
      return this.taskService.update(Number(id));
    }
    catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    

  }

  @Delete("/deleteTask/:id")
  remove(@Param('id') id: string) {
    try{
      return this.taskService.remove(Number(id));
    }    
    catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    
  }
}
