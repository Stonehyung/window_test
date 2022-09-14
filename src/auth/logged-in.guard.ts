import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate { //true냐 false냐에 따라 다음컨트롤러 
                                              //권한이 달라진다.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); //express의 request?
    return request.isAuthenticated(); //true면 다음 컨트롤러 사용가능
  }
}
