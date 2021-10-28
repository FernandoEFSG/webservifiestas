import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/extras/alerts/alerts.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';



@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  form!: FormGroup;
   result: any;

  constructor(
      private alertService: AlertsService,
      private  usuariosService: UsuariosService,
      private router: Router
  ) { }

  ngOnInit(): void {
      
    this.form = new FormGroup({
       nombre: new FormControl(null), 
       correo: new FormControl(null, [Validators.required, Validators.email]), 
    })
      
    document.body.classList.add('bg-recovery');
  }
  ngOnDestroy(): void {
    document.body.classList.remove('bg-recovery');
   }
   
   recuperaPassword(){ 
      let pass =  this.generarContrasenia(10);
      console.log(pass);
     console.log(this.form.value); 
      if(this.form.valid){
            console.log(this.form.value);
            const obj = {
                password: pass,
                email: this.form.controls.correo.value,
            }
            this.cambiarPassword(obj);
            console.log(this.result); 
      }else{
           var mensaje = 'Falta datos por llenar';
           var titulo =  'Datos';
           this.alertService.warnig(mensaje, titulo);
      }    
   }

   generarContrasenia(length: number): string {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  cambiarPassword(obj){
          var result: any;
        this.usuariosService.cambiarPassword(obj).subscribe((data: any)=>{
           console.log(data);
           if(data.err == false){
              this.enviarCorreo(obj);
              console.log('correocto');
           }
         },((err: any)=>{
            console.log(err);
            console.log(result);

            if(err.error.mensaje == 'Correo no existente'){
                var mensaje = 'Este correo no esta registrado';
                var titulo = 'Password'
                this.alertService.warnig(mensaje, titulo);
            }else{
                  var mensaje = 'Ha ocurrido un error inesperado';
                  var titulo = 'Error';
                  this .alertService.err(mensaje,titulo)
            }
          
         }))
  }
  
 
  enviarCorreo(obj): void {
    console.log(obj);
    this.usuariosService
      .enviarEmail(obj)
      .subscribe(
        (data) => {
           var mensaje = 'hemos enviado una nueva contraseña a su correo';
           var titulo = 'Correcto';
           this.alertService.succes(mensaje, titulo);
          //  this.router.navigate(['/login']);
        },
        (error) => {
          var mensaje = 'Ha ocurrido un error el enviar el correo intentalo mas tarde';
          var titulo = 'Error :(';
          this.alertService.err(mensaje, titulo);
          console.log('Ha ocurrido un errro');
        }
      );
  }
  








  









}
