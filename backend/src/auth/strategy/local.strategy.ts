import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserInfo } from 'src/user-info/entities/user-info.entity';
import { UserInfoService } from 'src/user-info/user-info.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private userService : UserInfoService){
        super({
            usernameField : "email",
            passwordField : "password"
        })
    }

    async validate(email: string, password: string): Promise<UserInfo> {
        try {
          const user: UserInfo = await this.userService.findUserByEmail(email);

          if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid email or password');
          }
    
          return user;
        } catch (error) {
          // Catch EntityNotFoundError and throw UnauthorizedException
          if (error.name === 'EntityNotFoundError') {
            throw new UnauthorizedException('Invalid email or password');
          }
          throw error; // Rethrow other errors
        }
      }
}