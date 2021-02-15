import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {observable, throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private zone: NgZone,
    private router: Router,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    // add authorization header with jwt token if available
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(catchError(err => {
      if (req.url.endsWith('/login/')) {
        // just return error if request is to log in
        return throwError(err);
      }

      // if token expired, make user login again
      if (err instanceof HttpErrorResponse && err.status === 401) {
        if (req.url.endsWith('/login/')) {
          this.authService.logout();
          this.zone.run(() => this.router.navigate(['/login']));
        }
        // ???
        return next.handle(req);
      } else {
        throwError(err);
      }

    }));

  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
