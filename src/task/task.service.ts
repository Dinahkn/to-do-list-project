import { Injectable, NotFoundException } from '@nestjs/common';
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
    let task : Task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.user = await this.userService.findUserById(userId);
    
    return this.tasksRepository.save(task);
  }

  async getAllTasks(userId : number) {
    const tasks =  await this.tasksRepository.find({
      relations : ["user"],
      where : {user : {id : userId}},
    });
    if (!tasks || tasks.length === 0) {
      throw new Error('No tasks found for the given user');
    }

    return tasks;
  }

  getTaskById(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id: id } }).then(task => {
      if (!task) {
        throw new Error('Task not found');
      }
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
