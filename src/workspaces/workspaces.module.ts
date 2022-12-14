import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { ChannelMembers } from 'src/entities/ChannelMembers';
@Module({
  imports: [TypeOrmModule.forFeature(  [WorkspaceMembers, Workspaces, Channels, Users, ChannelMembers])],
  providers: [WorkspacesService],
  controllers: [WorkspacesController]
})
export class WorkspacesModule {}
