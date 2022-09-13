import { Body, Controller,Get,Post,Query,Param } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
    @Get()
    getChannels(){

    }
    @Post(':name')
    postChannel(){


    }
    @Get(':name')
    getSpecificChannel(){


    }
    @Get(':name/chats') // :id를 라우터 파라미터라 하며 param으로 가져올 수 있다.
    getChats(@Param() param, @Query() query){
        console.log(query.perPage, query.page);
        console.log(param.id, param.url);
    }
    @Post()
    postChat(@Body() body){

    }
    @Get(':name/members')
    getAllMembers(){


    }
    @Post(':name/members')
    inviteMembers(){

    }

}
