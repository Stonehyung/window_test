import { ConfigurableModuleBuilder, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MiddlewareBuilder } from '@nestjs/core';
import { consumers } from 'stream';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { DmsModule } from './dms/dms.module';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsService } from './channels/channels.service';
import { ChannelsModule } from './channels/channels.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { UsersService } from './users/users.service';
import { WorkspacesService } from './workspaces/workspaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig'
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { Users } from './entities/Users';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { AuthModule } from './auth/auth.module';

const getdata = async () => {

  return{
    DB_USERNAME: 'root',
    DB_PASSWORD: 'root',
    DB_DATABASE: 'sleact2'
  }
}
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true , load: [getdata]}),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async(configService : ConfigService) => {
      return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          ChannelChats,
          ChannelMembers,
          Channels,
          DMs,
          Mentions,
          Users,
          WorkspaceMembers,
          Workspaces,
          
        ],
        migrations: [__dirname + '/src/migrations/*.ts'],
        cli: { migrationsDir: 'src/migrations' },
        autoLoadEntities: true,
        charset: 'utf8mb4',
        synchronize: false,
        logging: true,
        keepConnectionAlive: true,


      } 
      }
    }),

  ],
  controllers: [AppController, ChannelsController],
  providers: [AppService, ConfigService, ChannelsService, UsersService, WorkspacesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
