import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
    @ApiParam({
        name : 'url',
        required : true,
        description : '워크스페이스 url',
    })
    @ApiParam({
        name : 'id',
        required : true,
        description : '사용자 아이디',
    })
    @ApiQuery({
        name: 'perPage',
        required: true,
        description: '한 번에 가져오눈 개수'
    })
    @ApiQuery({
        name: 'Page',
        required: true,
        description: '불러올 페이지'
    })
    @Get(':id/chats') // :id를 라우터 파라미터라 하며 param으로 가져올 수 있다.
    getChats(@Param() param, @Query() query){
        console.log(query.perPage, query.page);
        console.log(param.id, param.url);
    }

    @Post(':id/chats')
    postChat(@Body() body){}
}
