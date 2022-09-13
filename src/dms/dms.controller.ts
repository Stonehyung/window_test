import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { query } from 'express';

@Controller('api/workspaces/:url/dms')
export class DmsController {

    @Get(':id/chats') // :id를 라우터 파라미터라 하며 param으로 가져올 수 있다.
    getChats(@Param() param, @Query() query){
        console.log(query.perPage, query.page);
        console.log(param.id, param.url);
    }

    @Post(':id/chats')
    postChat(@Body() body){}
}
