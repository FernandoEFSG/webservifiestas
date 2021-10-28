import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../environments/environment';
// import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient,HttpEventType, HttpHeaders, HttpRequest,} from '@angular/common/http';
declare var UIkit:any;

@Injectable({
  providedIn: 'root'
})
export class SubirimgService {

  constructor(private http: HttpClient) { }
   
  _subirArchivos(
    archivos: File[],
    tipo: string,
    id: string,
    campo: string = ''
  )  {
    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append('file' + i, archivos[i], archivos[i].name);
    }
    return this.http.post(
      `${URL_SERVICIOS}${tipo}/upload/${id}/${campo}`,
      formData,
      { reportProgress: true, observe: 'events' }
    ).pipe(map((event:any)=>{
      if (event.type === HttpEventType.UploadProgress) {
        console.log("upload progress");
        // UIkit.notification({message: 'Datos cargados...', status: 'success'});
        let percentage = 100 / event.total * event.loaded;
        console.log(percentage);
      }
      if (event.type === HttpEventType.Response) {
          console.log("upload completed");
          // UIkit.notification({message: 'Datos cargados...', status: 'success'});
          // console.log(event);
      }
      return {...event}
    }), catchError((err: any)=> {
      console.log(err);
      return throwError(err)
    }));
  }

  _subirImg(
    archivos: File[],
    tipo: string,
    id: string,
    campo: string = ''
  ) {
    
    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append('file' + i, archivos[i], archivos[i].name);
    }  
    return this.http.post(
      `${URL_SERVICIOS}${tipo}/upload/${id}/${campo}`,
      formData,
      { reportProgress: true, observe: 'events' }
    ).pipe(map(event=>{
      if (event.type === HttpEventType.UploadProgress) {
        console.log("upload progress");
        // UIkit.notification({message: 'Datos cargados...', status: 'success'});
        let percentage = 100 / event.total * event.loaded;
        console.log(percentage);
      }
      if (event.type === HttpEventType.Response) {
          console.log("upload completed");
          // UIkit.notification({message: 'Datos cargados...', status: 'success'});
          // console.log(event);
      }
      return event
    }), catchError(err=> throwError(err)));
  }




}
