import { ApiProperty } from "@nestjs/swagger";
import { userTypeDto } from "src/users/dto/userType.request.dto";
export class UserDto extends userTypeDto  {
    @ApiProperty( {
        required: true,
        example: 1,
        description: '아이디',
    })
    id: number;
   
}