import { Controller, Post, Req, UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/user-info/entities/user-info.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post("/login")
  @UseGuards(AuthGuard("local"))
  login(@Req() req){
    const user : UserInfo = req.user;
    console.log(user);
    const payload = {
        id : user.id,
        firstname : user.firstname,
        lastname : user.lastname,
        email: user.email,
        role : user.role,
    };

    const token = this.jwtService.sign(payload);

    return { token, userId: user.id };
  }


}
