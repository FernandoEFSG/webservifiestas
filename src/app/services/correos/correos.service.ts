import { Injectable } from '@angular/core';
import {HttpClient  } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreosService {
  url = `${URL_SERVICIOS}Certificacion/`;
  constructor(
    private http: HttpClient
  ) { }

  correo(obj){
    return this.http.post(`${this.url}/sendMail`,  obj).pipe(map((res: any)=>{
      return res;
    }), catchError((err: any)=>{
        return throwError(err);
       }
    ))
 }

 contacto(obj){
  return this.http.post(`${this.url}/contacto`,  obj).pipe(map((res: any)=>{
    return res;
  }), catchError((err: any)=>{
      return throwError(err);
     }
  ))

 }


}
