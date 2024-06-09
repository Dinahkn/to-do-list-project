import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UserInfoService } from 'src/user-info/user-info.service';

@Injectable()
export class TaskService {

  //Add task based on userId
  //Find all tasks uncompleted based on userId
  //Find all tasks completed based on userId
  //Mark task completed by taskId
  //Delete task based on task id 
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,private userService : UserInfoService
  ) {}

  async create(createTaskDto: CreateTaskDto,userId : number) {
    let task : Task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.isDone = false;
    task.user = await this.userService.findUserById(userId);
    
    return this.tasksRepository.save(task);
  }

  getAllTasks(userId : number) {
    return this.tasksRepository.find({
      relations : ["user"],
      where : {user : {id : userId}},
    });
  }

  getTaskById(id: number): Promise<Task> {
    const task = this.tasksRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  update(taskid: number) {
    return this.tasksRepository.update(taskid,{isDone : true});
  }

  remove(taskid: number) {
    return this.tasksRepository.delete(taskid);
  }
}
