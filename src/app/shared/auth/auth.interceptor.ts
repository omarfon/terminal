import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private inj: Injector, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.inj.get(AuthService);

    const authHeader = auth.getAuthorizationHeader();

    let request = req;

    // if (auth.isAuthenticated()) {
  
    //   const authHeader = auth.getAuthorizationHeader();
     
    //   const authReq = req.clone({setHeaders: {Authorization: authHeader}});
    
    //   return next.handle(authReq);

    // } else {
    //   console.log('ocurrio un error', req)
    //   return next.handle(req);
    // }

    if (authHeader) {
      request = req.clone({
        setHeaders: {
          authorization: `${ authHeader }`
        }
      });
    }

    return next.handle(request);
    
  }

}
