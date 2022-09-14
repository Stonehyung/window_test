import { ApiProperty } from "@nestjs/swagger";

// dto 생성 
export class userTypeDto{
   @ApiProperty({
      example : 'qkdgkr1258@naver.com',
      description : '이메일',
      required : true,
   })
   public email : string;
   

   @ApiProperty( { 
      example : 'choidol',
      description : '닉네임',
      required : true
   })
   public nickname : string;
   
   @ApiProperty( {
      example : '1234',
      description : '비밀번호',
      required : true
   })
   public password : string;
}