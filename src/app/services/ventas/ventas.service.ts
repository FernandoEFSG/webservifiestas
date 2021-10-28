import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ventas } from 'src/app/model/ventas.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  url = `${URL_SERVICIOS}ventaseweb/`;
  constructor(
     private http: HttpClient
  ) { }
  update(id: number, Ventas: Ventas ){
    return this.http.put(`${this.url}${id}`, Ventas ).pipe(map((res: any)=>{
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
  post(Ventas : Ventas ){
    return this.http.post(this.url, Ventas ).pipe(map((res: any)=>{
      return res;
    }), catchError((err: any)=>{
        return throwError(err);
       }
    ))
 }

 stripe(obj: any){
  return this.http.post(`${URL_SERVICIOS}stripe/stripe`,obj).pipe(map((res: any)=>{
    return res;
  }), catchError((err: any)=>{
      return throwError(err);
     }
  ))
}
getidStriper(obj: any){
  return this.http.post(`${URL_SERVICIOS}stripe/stripe`,obj).pipe(map((res: any)=>{
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
