import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { usuarios } from 'src/app/model/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = `${URL_SERVICIOS}usuarios/`;

  constructor(
    private http: HttpClient
  ) { }

  update(id: number, usuarios: usuarios){
    return this.http.put(`${this.url}${id}`, usuarios).pipe(map((res: any)=>{
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
  post(usuarios: usuarios){
    return this.http.post(this.url, usuarios).pipe(map((res: any)=>{
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

cambiarPassword(obj: any){
  return this.http.put(`${this.url}password`, obj).pipe(map((res: any)=>{
  
    return res;
  }),catchError((err: any)=>{
  
    return throwError(err);
  }) 
  )
}

enviarEmail(obj) {
  return this.http.post(`${this.url}/sendMail`, obj).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((err) => {
      return throwError(err);
    })
  );
}








}
