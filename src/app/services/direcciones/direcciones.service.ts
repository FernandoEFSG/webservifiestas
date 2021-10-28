import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direcciones } from '../../model/direcciones.interface';



@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  url = `${URL_SERVICIOS}direcciones/`;

  constructor(
    private http: HttpClient
  ) { }
  
  update(id: number, Direcciones: Direcciones ){
    return this.http.put(`${this.url}${id}`, Direcciones ).pipe(map((res: any)=>{
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
  post(Direcciones : Direcciones ){
    return this.http.post(this.url, Direcciones ).pipe(map((res: any)=>{
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
