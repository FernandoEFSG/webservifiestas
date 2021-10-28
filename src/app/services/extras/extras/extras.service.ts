import { Injectable } from '@angular/core';
import { pinatas } from 'src/app/model/pinatas.interface';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  url = `${URL_SERVICIOS}extras/`;

  constructor(
    private http: HttpClient
  ) { } 


  get(obj){
    return this.http.post(`${this.url}/busquedafecha`, obj).pipe(map((res: any)=>{
    
      return res;
    }),catchError((err: any)=>{
    
      return throwError(err);
    }) 
    )
  }
   
  masvendido(){
    return this.http.get(`${this.url}masvendidos`).pipe(map((res: any)=>{
      return res;
    }),catchError((err: any)=>{
    
      return throwError(err);
    }) 
    )
  }

  buscar(obj: any){ 
    return this.http.post(`${this.url}search`, obj).pipe(map((res: any)=>{
      return res;
    }), catchError((err: any)=>{
         return throwError(err);
    }) 
    )

  }






}
