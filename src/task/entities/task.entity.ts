import { UserInfo } from "src/user-info/entities/user-info.entity";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description : string;

    @Column({ default: false })
    isDone: boolean;

    //many tasks can refer to single user
    @ManyToOne(()=> UserInfo, (user)=>user.tasks)
    user : UserInfo;
}
