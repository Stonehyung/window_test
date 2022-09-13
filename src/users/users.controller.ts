import { Body, Controller, Get,  Post, Req , Res } from '@nestjs/common';
import { userTypeDto } from './dto/userType.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private userService: UsersService){   

     }
    @Get()
    getUsers(@Req() req){
        return req.user;
    }
    @Post() // 닉네임, 이메일, 비밀번호는 @Body()로 온다.
    postUsers(@Body() data : userTypeDto){ //Body에 들어있는 데이터가 data 객체가 된다.
        this.userService.PostUsers( data.nickname, data.email, data.password);
    }
    @Post('login')
    logIn(@Req() req){
        return req.user;
    }
    @Post('logout')
  logOut(@Req() req, @Res() res) { //express에 의존적임 -> 사용하지 않는게 좋지만 logout은 어쩔 수 없음
    req.logOut();
    req.clearCookie('connect.sid', { httpOnly: true }) ;
    res.send('ok');
  }
}
