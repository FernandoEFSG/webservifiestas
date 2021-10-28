import { Injectable } from '@angular/core';
import {HttpClient  } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';
import { OrderService } from '../../model/orderService.interface';

@Injectable({
  providedIn: 'root'
})
export class CarordenService {
  url = `${URL_SERVICIOS}car_order_service/`;

  constructor(
    private http:HttpClient,
  ) { }
  get(){
    return this.http.get(`${this.url}`).pipe(map((res: any)=>{
    
      return res;
    }),catchError((err: any)=>{
    
      return throwError(err);
    }) 
    )
  }

  update(id: number,  OrderService :  OrderService ){
    return this.http.put(`${this.url}${id}`,  OrderService ).pipe(map((res: any)=>{
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
  post( OrderService :  OrderService ){
    return this.http.post(`${this.url}`,  OrderService ).pipe(map((res: any)=>{
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

getrefer(id: number){
  return this.http.get(`${this.url}/Byrefer/${id}`).pipe(map((res: any)=>{
    return res
  }), catchError((err: any)=>{
       return throwError(err);
  })
  )
}


}
