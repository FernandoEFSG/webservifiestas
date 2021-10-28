import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CorreosService } from '../../services/correos/correos.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 
  form!: FormGroup;

  constructor(
     private correosService: CorreosService,
     private alertService: AlertsService,
  ) { }

  ngOnInit(): void {
     this.form = new FormGroup({
        correo: new FormControl(null, Validators.required),
     })
  }

  enviar(){
      if(this.form.valid){

           const obj = {
               correo: this.form.controls.correo.value,
               mensaje: 'Obtener mas información',
           }   

           console.log('fomulario valido');
            this.correosService.correo(obj).subscribe((data: any)=>{
              console.log(data);
               var mensaje = 'No pondremos en contacto contigo';
               var titulo = 'Mensaje';
               this.alertService.succes(mensaje, titulo);

            },((err:any)=>{
                console.log(err);
            }))
         
      }else{
           console.log('Falntan compor por llenar');
           var mensaje = 'No has agregado un correo';
           var titulo = 'Contacto';
            this.alertService.warnig(mensaje, titulo);
      }
  } 



}
