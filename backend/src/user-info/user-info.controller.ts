import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpException, Req, UseGuards } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post("/signUp")
  async create(@Body() createUserInfoDto: CreateUserInfoDto) {
    try {
      const user = await this.userInfoService.create(createUserInfoDto);
      return { user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req() req) {
    console.log(req.user);
    return this.userInfoService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userInfoService.findUserByEmail(email);
  }


  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: string,@Req() req) {
    console.log(req.user);
    return this.userInfoService.remove(+id);
  }
}
