import { Body, Controller, Get,  Post, Req , Res,UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNUll.Interceptor';
import { UserDto } from 'src/common/user.dto';
import { userTypeDto } from './dto/userType.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
    constructor( private userService: UsersService){   

     }
    @ApiOperation( {summary : '내 정보조회'})
    @Get()
    getUsers(@User() user){
        return user;
    }
    @ApiOperation( { summary : '회원 가입'})
    @Post() // 닉네임, 이메일, 비밀번호는 @Body()로 온다.
    postUsers(@Body() data : userTypeDto){ //Body에 들어있는 데이터가 data 객체가 된다.
        this.userService.PostUsers( data.nickname, data.email, data.password);
    }
    @ApiResponse({
      status: 200,
      description: '로그인 성공',
      type: UserDto,

    })
    @ApiOperation( { summary : '로그인'})
    @Post('login')
    logIn(@User() user){
        return user;
    }
    @ApiOperation( { summary : '로그 아웃'})
    @Post('logout')
  logOut(@User() user, @Res() res) { //express에 의존적임 -> 사용하지 않는게 좋지만 logout은 어쩔 수 없음
    user.logOut();
    user.clearCookie('connect.sid', { httpOnly: true }) ;
    res.send('ok');
  }
}
