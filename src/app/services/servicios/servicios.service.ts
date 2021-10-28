import { Injectable } from '@angular/core';
import { pinatas } from 'src/app/model/pinatas.interface';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  url = `${URL_SERVICIOS}servicios/`;
  constructor(
    private http: HttpClient
  ) { }

   
 getByid(id: number){
  return this.http.get(`${this.url}/byid/${id}`).pipe(map((res: any)=>{
    return res
  }), catchError((err: any)=>{
       return throwError(err);
  })
  )
}

  get(){
    return this.http.get(`${this.url}`).pipe(map((res: any)=>{
    
      return res;
    }),catchError((err: any)=>{
    
      return throwError(err);
    }) 
    )
  }
  
  getcategoria(condicion: number, orden?: string  ){
    return this.http.get(`${this.url}/filtro/${condicion}/${orden}`).pipe(map((res: any)=>{
      return res;
    }),catchError((err: any)=>{
    
      return throwError(err);
    }) 
    )
  }

  



}
