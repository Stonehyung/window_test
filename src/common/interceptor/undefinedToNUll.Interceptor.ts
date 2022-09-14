

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //controller 가기 전 부분임. 
    //-> 로깅해서 컨트롤러 부분이 얼마나 걸렸는지 시간 측정 같은거에 사용 가능
    //이렇게 쓸 수도 있음. 지금은 용도에 맞지 않아서 주석 처리
    //return next.handle().pipe(map((data) => ({ data, code: 'SUCCESS' }))); 
    //data가 controller에서 return 받은 데이터임(return 받은게 user였다면 결과는 {data: user, code: 'SUCCESS'}가 된다.)
    
    return next.handle().pipe(map((data) => data === undefined ? null : data)); 
    //data가 undefined라면 null로 바꿔주고 아니라면 그냥 data 넣어줌
    //(data에 undefined가 들어가서 에러를 발생시키는 상황에 대비하는거)

    //controller 실행 후 부분
  }
}