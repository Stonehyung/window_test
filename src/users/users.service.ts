import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { ChildEntity, Connection, getConnection, Repository, ReturningStatementNotSupportedError } from 'typeorm';
  import bcrypt from 'bcrypt';
  import { ChannelMembers } from '../entities/ChannelMembers';
  import { userTypeDto } from './dto/userType.request.dto';
  import { Users } from '../entities/Users';
  import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Channel } from 'diagnostics_channel';
  
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectRepository(Users) 
      private usersRepository: Repository<Users>,
      @InjectRepository(WorkspaceMembers)
      private workSpaceMebersRepository: Repository<WorkspaceMembers>,
      @InjectRepository(ChannelMembers)
      private channelMemberRepository: Repository<ChannelMembers>,
      private connection:Connection
    
       ) {}
    getUser(){}
        
     async join(email: string, nickname: string, password: string) {  
        //const queryRunner = getConnection().createQueryRunner(); 
        //queryRunner.connect();
        // 라이브러리를 바로 사용하는 것은 굉장히 위험하다.
        const queryRunner = this.connection.createQueryRunner();
        queryRunner.connect(); //트랜잭션 연결
        //테스트 해야 할 때 테스트용 객체를 쉽게 connection으로 대체할 수 있다.
        await queryRunner.startTransaction(); //트랜잭션 시작

        //const user = await this.usersRepository.findOne({ where: { email } });
        //queryRunner와 manager를 이용해서 Repositary를 불러와야지만 트랜잭션이 걸린다.
        const user = await queryRunner.manager.getRepository(Users).findOne({where: { email }});

        if (user) {
          throw new ForbiddenException('이미 존재하는 사용자입니다');
        }
        
        const hashPassword = await bcrypt.hash(password, 12);
        try {

          const returned = await queryRunner.manager.getRepository(Users).save({
            email,
            nickname,
            password: hashPassword,
          });

          throw new Error('롤백 되는지 테스트');
          const workspacemembers = this.workSpaceMebersRepository.create();
          workspacemembers.UserId = returned.id;
          workspacemembers.WorkspaceId = 1;
          await queryRunner.manager.getRepository(WorkspaceMembers).save(workspacemembers);
          await queryRunner.manager.getRepository(ChannelMembers).save( {
            UserId: returned.id,
            ChannelId: 1,
          });
          await queryRunner.commitTransaction();
          return true; // 정상적으로 진행 되었을 때 커밋 트랜잭션
        } catch(error) { // 오류 발생시 롤백 트랜잭션
          console.error(error);
          await queryRunner.rollbackTransaction();
          throw error;
        } finally{
          await queryRunner.release(); //성공을 했든 실패를 했든 연결끊는 기능
        }

        /*
        const returned = await this.usersRepository.save({
          email,
          nickname,
          password: hashPassword,
        });
        await this.workSpaceMebersRepository.save({
          UserId: returned.id,
          WorkspaceId: 1,
        });
        await this.channelMemberRepository.save({
          UserId: returned.id,
          WorkspaceId: 1,
        });
        //insert를 세번을 거치게 되면 앞부분 쿼리는 성공하지만 뒤가 실패한 경우가 발생할 수 있다.
        // -> 트랜잭션을 사용한다 
        //트랜잭션이란 요청을 처리하는 과정에서   데이터베이스에서 요청을 처리하는 요청을 독립적으로 나누고,
        // 오류가 발생했을 경우에 이전 상태로 돌리게 해주는 기능이다.
        return true; */
        } 
      }

        
    