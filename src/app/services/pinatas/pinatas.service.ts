import { Injectable } from '@angular/core';
import { pinatas } from 'src/app/model/pinatas.interface';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PinatasService {

  url = `${URL_SERVICIOS}pinatas/`;
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
  

  update(id: number,  pinatas:  pinatas){
    return this.http.put(`${this.url}${id}`,  pinatas).pipe(map((res: any)=>{
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
  post( pinatas:  pinatas){
    return this.http.post(this.url,  pinatas).pipe(map((res: any)=>{
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

getcategoria( orden?: string  ){
  return this.http.get(`${this.url}/filtro/${orden}`).pipe(map((res: any)=>{
    return res;
  }),catchError((err: any)=>{
  
    return throwError(err);
  }) 
  )
}


}
