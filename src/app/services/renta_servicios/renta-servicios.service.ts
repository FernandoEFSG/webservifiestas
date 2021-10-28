import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';
import { Renta_servicios } from 'src/app/model/rentaservicios.interface';

@Injectable({
  providedIn: 'root'
})
export class RentaServiciosService {
  url = `${URL_SERVICIOS}renta/`;
   
  constructor(
    private http: HttpClient
  ) { }

  get(){
    return this.http.get(`${this.url}`).pipe(map((res: any)=>{
    
      return res;
    }),catchError((err: any)=>{
    
      return throwError(err);
    }) 
    )
  }

  update(id: number,  Renta_servicios:  Renta_servicios){
    return this.http.put(`${this.url}${id}`,  Renta_servicios).pipe(map((res: any)=>{
      return res;
    }), catchError((err: any)=>{
      return throwError(err);
    })
    )
  }

  delete(id: number){
    return this.http.delete(`${this.url}${id}`).pipe(map((res: any)=>{
      return res;
    }), catchError((err: any)=>{
      return throwError(err);
    })
    )
  }
  post( Renta_servicios:  Renta_servicios){
    return this.http.post(`${this.url}`,  Renta_servicios).pipe(map((res: any)=>{
      return res;
    }), catchError((err: any)=>{
        return throwError(err);
       }
    ))
 }

 getByid(id: number){
  return this.http.get(`${this.url}/byid/${id}`).pipe(map((res: any)=>{
    return res
  }), catchError((err: any)=>{
       return throwError(err);
  })
  )
}




}
