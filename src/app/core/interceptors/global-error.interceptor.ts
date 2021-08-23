import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      let errormessage= ""
      
      if (error instanceof HttpErrorResponse){
        if(error.status===401){
          errormessage= "Please Check Username or Password";

        }
        else{
          errormessage="Something went wrong";
        }
      }
      return throwError (errormessage)
    }))

  }
}
