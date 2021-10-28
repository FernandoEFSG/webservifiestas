import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginService, 
    private alertService: AlertsService,
    private router: Router,
  ) { }

 form!: FormGroup;
   
 carrito: any [] = [];
 cuantos: number;

  ngOnInit(): void {
     this.form = new FormGroup ({
       correo: new FormControl(null, [Validators.required, Validators.email]),
       password: new FormControl (null, [Validators.required]),
     });

     const lista = this.existproducto();
     if(lista == true){
        console.log(lista); 
        const nuevalista = JSON.parse(localStorage.getItem('cartproductos'));
        console.log('productos', nuevalista);
        this.carrito = nuevalista;
        console.log(this.carrito.length);
        this.cuantos = this.carrito.length;
  
     } else{
      this.cuantos = 0;
     }

     this.varificarsession();
  }

  cerrar(){
    this.loginService.logout();
  }
  login(){
      if(this.form.valid){
        this.loginService.login(this.form.value).subscribe((data)=>{
            console.log(data);
            if(!data.err){
              this.loginService.guardarStorage(data.usuario.id, data.token, data.usuario);
              let mensaje = 'Inicio de session correcto';
              let titulo  =  'Login';
              this.alertService.succes(mensaje, titulo);
              this.close();
            }
        },((err:any)=>{
          console.log(err);
          let mensaje = 'Password o correo incorrectos';
          let titulo  =  'Login';
          this.alertService.err(mensaje, titulo);
        })
        )
      }else{
        let mensaje = 'Datos incompletos';
        let titulo  =  'Login';
        this.alertService.warnig(mensaje, titulo);
      }
  }

  close(){
    ($('#loginModal') as any).modal('hide');
    ($('body')as any ).removeClass('modal-open');
    ($('.modal-backdrop')as any ).remove();
  }
  
  open(){
    ($('#loginModal') as any).modal('show');
  
  }

 inciarSesionModal(){
      let session = this.existsCart();
      if(session == true){
        ($('#cerrarSesion') as any).modal('show');
      }else{
        ($('#loginModal') as any).modal('show');
      }
 }


 
isdisable: boolean;

  varificarsession(){
    let session = this.existsCart();
    if(session == true){
       this.isdisable = false;
    }else{
      this.isdisable = true;
    }
  }


  productos(){
    let tipo =  this.existsCart();
    let carrito = this.existproducto();
    console.log('tipo', tipo);
    console.log('carrito', carrito);

      if(tipo == true){
          if(carrito == true){
            console.log('Carrito', carrito);
            this.router.navigate(['/carrito-prod']);
          }else{
            let mensaje = 'No existen productos en el carrito';
            let titulo  =  'Atención';
            this.alertService.warnig(mensaje, titulo);
          }
      }else{
        let mensaje = 'No has iniciado sessión';
        let titulo  =  'Atención';
        this.alertService.warnig(mensaje, titulo);
        this.open();
      }
  }

  servicios(){
    let tipo =  this.existsCart();
    let carrito = this.existservicio();
    console.log('tipo', tipo);
    console.log('carrito', carrito);

      if(tipo == true){
          if(carrito == true){
            console.log('Carrito', carrito);
            this.router.navigate(['/carrito-serv']);
          }else{
            let mensaje = 'No existen productos en el carrito';
            let titulo  =  'Atención';
            this.alertService.warnig(mensaje, titulo);
          }
      }else{
        let mensaje = 'No has iniciado sessión';
        let titulo  =  'Atención';
        this.alertService.warnig(mensaje, titulo);
        this.open();
      }
  }



  existproducto(): boolean{
    return localStorage.getItem('cartproductos') != null;
  }

  existservicio(): boolean{
    return localStorage.getItem('cartservice') != null;
  }

  existsCart(): boolean {
    return localStorage.getItem('token') != null;
  }



}
