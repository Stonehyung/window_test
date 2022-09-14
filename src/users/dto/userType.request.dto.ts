import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";
// dto 생성 
export class userTypeDto extends PickType(Users, [
   'email', 
   'nickname', 
   'password',
 ] as const) {}