import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
import { Request } from "express";
import { UserInfo } from "src/user-info/entities/user-info.entity";
export class RoleGuard implements CanActivate{

    private role : string;
    constructor(role : string){
        this.role = role;
    }
    canActivate(context: ExecutionContext): boolean{
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        const userInfo : UserInfo = request.user as UserInfo;
        if(this.role == userInfo.role) 
            return true;
        return false;
    }
}