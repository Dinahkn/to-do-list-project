import { IsEmail, IsNotEmpty } from "class-validator";
import { Task } from "src/task/entities/task.entity";
import { Column,Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    firstname : string;

    @Column()
    lastname : string;

    @Column({unique: true})
    @IsEmail({},{message : 'Incorrect email'})
    @IsNotEmpty({message : 'The email is required'})
    email : string;

    @Column()
    @IsNotEmpty({message : 'Password is required'})
    password : string;

    @Column()
    role : string;

    //one user can have multiple tasks
    @OneToMany(()=> Task, (task)=> task.user)
    tasks : Task[];

}
