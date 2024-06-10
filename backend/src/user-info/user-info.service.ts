import { Injectable, Post,Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UserInfo } from './entities/user-info.entity';
import { Constants } from 'src/utils/constants';

// create new user
// find all user - admin
// delete user - admin

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
    user.role = Constants.ROLES.NORMAL_USER;
    return await this.usersRepository.save(user);
  }

  @Get()
  findAll() {
    return this.usersRepository.find();
  }

  @Get()
  findUserByEmail(email: string) {
    return this.usersRepository.findOne({where : {email : email}});
  }

  async findUserById(id : number){
    try {
      const user = await this.usersRepository.findOne({ where: { id: id } });
      return user;
  } catch (error) {
      throw new Error("User not found with the provided ID");
  }
  }


  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
