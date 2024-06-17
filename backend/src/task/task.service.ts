import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UserInfoService } from 'src/user-info/user-info.service';

@Injectable()
export class TaskService {

  //Add task based on userId
  //Find all tasks
  //Mark task isDone by taskId
  //Delete task based on task id 

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,private userService : UserInfoService
  ) {}

  async create(createTaskDto: CreateTaskDto,userId : number) {
    try {
      const existingUser = await this.userService.findUserById(userId);
      let task: Task = new Task();
      
      if (!existingUser) {
          throw new HttpException('No user exists for this id', HttpStatus.NOT_FOUND);
      }
      
      task.title = createTaskDto.title;
      task.description = createTaskDto.description;
      task.user = existingUser;
      
      return await this.tasksRepository.save(task);
  } catch (error) {
      throw new HttpException('Failed to create task: ' + error.message, HttpStatus.BAD_REQUEST);
  }
}
  

  async getAllTasks(userId : number) {
    const tasks =  await this.tasksRepository.find({
      relations : ["user"],
      where : {user : {id : userId}},
    });
    return tasks;
  }

  getTaskById(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id: id } }).then(task => {
      return task;
    });
  }

  update(taskid: number) {
    return this.tasksRepository.update(taskid,{isDone : true});
  }

  remove(taskid: number) {
    return this.tasksRepository.delete(taskid);
  }
}
