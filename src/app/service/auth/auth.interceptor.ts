import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "./token.service";

const TOKEN_KEY = 'Authorization'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.tokenService.getToken();
    if(token!=null) {
      authReq = request.clone({headers:request.headers.set(TOKEN_KEY,'Bearer'+token)});
    }
    return next.handle(authReq);
  }
}

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
];
