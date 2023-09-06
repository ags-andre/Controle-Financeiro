import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { MensageriaService } from '../../services/mensageria.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private mensageria: MensageriaService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == 0) {
          this.mensageria.openSnackBar('Erro no servidor!')
        }
        else if(err.status == 401) {
          this.mensageria.openSnackBar('Sessão Expirada!');
          this.router.navigate(['/login']);
        }
        else {
          this.mensageria.openSnackBar('Status: '+ err.status + ' - ' + err.error.mensagem);
        }
        throw '';
      })
    );
  }
}
