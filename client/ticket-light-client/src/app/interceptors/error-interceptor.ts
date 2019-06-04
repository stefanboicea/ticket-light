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
                    console.log('server error ==>');
                    console.log(err);
                    if (err instanceof HttpErrorResponse) {
                        const serverError = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
                        this.broadcaster.broadcast('error', serverError);
                        console.log('server error ==>');
                        console.log(serverError);
                    }
                }
            ));
    }
}
