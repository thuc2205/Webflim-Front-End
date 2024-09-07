import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/TokenService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    if (url.includes('/api/v1/movies')) {
      return next.handle(req);
    }
    if (url.includes('/api/v1/genres')) {
      return next.handle(req);
    }
    if (url.includes('/api/v1/episode')) {
      return next.handle(req);
    }
    if (url.includes('/api/v1/favorites')) {
      return next.handle(req);
    }
    if (url.includes('/api/v1/user/**')) {
      return next.handle(req);
    }
    const token = this.tokenService.getToken();
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the cloned request to inspect headers
      console.log('Cloned request with token:', clonedRequest);

      return next.handle(clonedRequest);
    }

    // Log the request if token is not present
    console.log('Request without token:', req);

    return next.handle(req);
  }
}
