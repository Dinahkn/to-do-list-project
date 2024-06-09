import { Injectable, Post,Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UserInfo } from './entities/user-info.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private usersRepository: Repository<UserInfo>
  ) {}

  @Post()
  async create(createUserInfoDto: CreateUserInfoDto) {
    const existingUser = await this.usersRepository.findOne({ where: { email : createUserInfoDto.email } });
    if (existingUser) {
      throw new Error('Email is already in use');
    };
    let user : UserInfo = new UserInfo();
    user.email = createUserInfoDto.email;
    user.firstname = createUserInfoDto.firstname;
    user.lastname = createUserInfoDto.lastname;
    user.password = createUserInfoDto.password;
    user.role = 'NORMAL_USER';
    return await this.usersRepository.save(user);
  }

  @Get()
  findAll() {
    return this.usersRepository.find();
  }

  @Get()
  findUserByEmail(email: string) {
    return this.usersRepository.findOneOrFail({where : {email : email}});
  }

  findUserById(id : number){
    return this.usersRepository.findOneOrFail({where : {id : id}});
  }


  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
