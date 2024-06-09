import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  async create(@Body() createUserInfoDto: CreateUserInfoDto) {
    try {
      const user = await this.userInfoService.create(createUserInfoDto);
      return { user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  @Get()
  findAll() {
    return this.userInfoService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userInfoService.findUserByEmail(email);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInfoService.remove(+id);
  }
}
