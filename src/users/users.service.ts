import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Connection, Repository } from 'typeorm';
  import bcrypt from 'bcrypt';
  import { ChannelMembers } from '../entities/ChannelMembers';
  import { userTypeDto } from './dto/userType.request.dto';
  import { Users } from '../entities/Users';
  import { WorkspaceMembers } from '../entities/WorkspaceMembers';
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectRepository(Users) 
      private usersRepository: Repository<Users>,
       ) {}
    getUser(){}
        
     async join(email: string, nickname: string, password: string) {  
        
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user) {
          throw new ForbiddenException('이미 존재하는 사용자입니다');
        }
        
        const hashPassword = await bcrypt.hash(password, 12);
        console.log(email,nickname,hashPassword);
        await this.usersRepository.save({
          email,
          nickname,
          password: hashPassword,
        });
       
        } 
      }

        
    