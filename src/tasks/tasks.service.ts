import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    getTaskById(id: number):Task{
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskdto :CreateTaskDto) : Task{
        const {title,description} = createTaskdto;
        const task : Task = {
            id : this.tasks.length + 1,
            title,
            description,
            isDone: false
        };
        this.tasks.push(task);
        return task;
    }
    
    updateTask(id: number, updateTaskDto: CreateTaskDto): Task {
        const task = this.getTaskById(id);
        task.title = updateTaskDto.title;
        task.description = updateTaskDto.description;
        return task;
      }

    deleteTask(id: number): void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
