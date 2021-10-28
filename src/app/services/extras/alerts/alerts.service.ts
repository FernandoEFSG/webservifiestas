import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private toastrService: ToastrService,
  ) { }

  succes(mensaje, titulo){
    this.toastrService.success(mensaje,titulo, {
      timeOut:2500, 
      progressBar: false, 
    })
  }

  err(mensaje, titulo){
    this.toastrService.error(mensaje, titulo,  {
      timeOut:2500, 
      progressBar: false, 
    })
  }

  info(mensaje, titulo){
    this.toastrService.info(mensaje,titulo, {
      timeOut:2500, 
      progressBar: false, 
    })
  }

  warnig(mensaje, titulo){
    this.toastrService.warning(mensaje,titulo, {
      timeOut:2500, 
      progressBar: false, 
    })
  }


}
