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
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, DmsModule,  ChannelsModule, WorkspacesModule],
  controllers: [AppController, ChannelsController],
  providers: [AppService, ConfigService, ChannelsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
