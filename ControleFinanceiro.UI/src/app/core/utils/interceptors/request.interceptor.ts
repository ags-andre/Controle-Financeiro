import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private activeRequests = 0;

  constructor(
    private loaderService: LoaderService
  ) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.activeRequests === 0) {
      this.loaderService.show();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;

        if(this.activeRequests === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
