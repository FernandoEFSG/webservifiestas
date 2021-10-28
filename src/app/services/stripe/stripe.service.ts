import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StripeService {

  url = `${URL_SERVICIOS}stripe/`;

  constructor(
    private http: HttpClient
  ) { }
  
  stripe(obj: any){
    return this.http.post(`${URL_SERVICIOS}stripe/stripe`,obj).pipe(map((res: any)=>{
      return res;
    }), catchError((err: any)=>{
        return throwError(err);
       }
    ))
  }

  prueba(obj: any){
    console.log(obj);
  }
   
  create(props: any) {
    return this.http.post(`${this.url}create`, props).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err: any) => {
        // this.notify.show('Ocurrio un error inesperado', 'danger', 'top-right');
        console.log('errores');
        return throwError(err);
      })
    );
  }
  
  createSessionSuscripcion(props: any) {
    return this.http
      .post(`${this.url}create_check_session`, props)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: any) => {
           console.log('Ocurrio un error inesperado');
          // this.notify.show(
          //   'Ocurrio un error inesperado',
          //   'danger',
          //   'top-right'
          // );
          return throwError(err);
        })
      );
  }


}
