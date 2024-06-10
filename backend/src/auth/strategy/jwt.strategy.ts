import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(private configService : ConfigService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : configService.get("JWT_KEY")
        })
    }

    async validate(payload: any){
        return {
            id : payload.id,
            firstname : payload.firstname,
            lastname : payload.lastname,
            email: payload.email,
            role : payload.role,
        }
    }
}