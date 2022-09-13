import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { userInfo } from 'os';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  idget(): string {
    return process.env.NAME;
  }
}