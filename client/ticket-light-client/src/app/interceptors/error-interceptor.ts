import {ApiResponse} from '../model/models';
import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';


import { Observable } from 'rxjs';
import { Broadcaster } from '../core/broadcaster';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public broadcaster: Broadcaster) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => { },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        const response = err.error as ApiResponse;
                        this.broadcaster.broadcast('error', response);
                    }
                }
            ));
    }
}
