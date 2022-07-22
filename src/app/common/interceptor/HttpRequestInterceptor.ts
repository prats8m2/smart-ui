import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { StorageService } from '../services/storage.service';
import { StorageType } from '../constants/storage-type';
import { LoadingService } from '../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    accessToken!: string | null;
    constructor(private spinner: NgxSpinnerService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.accessToken = StorageService.get(StorageType.TOKEN);
        this.spinner.show();
        if (!req.url.includes('product'))
            req = req.clone({
                url: environment.baseurl + req.url,
                headers: req.headers.set(
                    'token',
                    this.accessToken ? this.accessToken : ''
                ),
            });

        return next
            .handle(req)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            )
            .pipe(
                map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                    if (evt instanceof HttpResponse) {
                        if (evt.body.code === 501 || evt.body.code === 503) {
                            window.location.href = '/login';
                            StorageService.remove(StorageType.TOKEN);
                        }
                        this.spinner.hide();
                    }
                    return evt;
                })
            );
    }
}
