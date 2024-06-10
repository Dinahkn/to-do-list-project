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
    try{
      return await this.taskService.getAllTasks(Number(userId));
    }catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
