import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const authReq = req.clone({
    setHeaders: {
      'X-User': 'frontend-user'
    }
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      snackBar.open(error.message, 'Fechar', {
        duration: 3000
      });
      return throwError(() => error);
    })
  );
};

