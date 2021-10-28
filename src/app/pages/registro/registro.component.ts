import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from 'src/environments/environment';
import { usuarios } from 'src/app/model/usuarios.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { AlertsService } from 'src/app/services/extras/alerts/alerts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private alertService: AlertsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');

    this.form = new FormGroup({
      nombre: new FormControl (null, Validators.required),
      password: new FormControl (null, Validators.required),
      telefono: new FormControl (null, Validators.required),
      correo: new FormControl (null, [Validators.required, Validators.email]),
      password2: new FormControl (null, Validators.required),
    });
  }
  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
  }
  
  password(){
         if(this.form.controls.password == this.form.controls.password2){
           return false;
         }else{
           return true;
         }
  }
  insert(){
      console.log('insertar');
       if(this.form.valid){
            if(this.form.controls.password.value ==  this.form.controls.password2.value){
              this.usuariosService.post(this.form.value).subscribe((data: any)=>{
                console.log(data);
               var  mensaje ='Registro completo/Inicia session';
                var titulo = 'Registro';
                this.alertService.succes(mensaje , titulo);
                this.router.navigate(['/accesorios']);
                this.clear();
              },((err: any)=>{
                console.log(err);
               var  mensaje ='Ha ocurrido un error en el registro';
               var titulo = 'Registro';
               this.alertService.warnig(mensaje , titulo)      
              }));
            }else{
              var  mensaje ='Las contraseña no coiciden';
              var titulo = 'Registro';
              this.alertService.warnig(mensaje , titulo) 
            }                
       } 
  }

clear(){
  this.form.reset();
}




}
