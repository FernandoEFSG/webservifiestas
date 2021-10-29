import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiciosService } from 'src/app/services/servicios/servicios.service';
import { Servicios } from 'src/app/model/servicios.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './sonido.component.html',
  styleUrls: ['./sonido.component.css']
})
export class SonidoComponent implements OnInit {
  urlimg = 'https://servifiestas.com.mx/punto_venta/assets/images/services/';
  
  // sonidos:any = [
  //   { img: './assets/imgs/sonido/sonido.jpg', precio: '1500', descripcion: 'Altavoz potente con doble bocina y bajos potentes' },
  //   { img: './assets/imgs/sonido/sonido2.jpg', precio: '1900',  descripcion: 'Altavoz potente con doble bocina y bajos potentes' },
  //   { img: './assets/imgs/sonido/sonido3.png', precio: '1435',  descripcion: 'Altavoz potente con doble bocina y bajos potentes' },
  //   { img: './assets/imgs/sonido/sonido4.jpg', precio: '1235',  descripcion: 'Altavoz potente con doble bocina y bajos potentes' },

  // ]

  p: number = 1;
  condicion: number;
  Sonidos: Servicios [] = [];
  servicio: any = {};
  orden: string = 'No'; 
  form!: FormGroup;

  constructor(
     private serviciosService: ServiciosService,
     public sanitizer: DomSanitizer,
     private alertService: AlertsService,
    private carritoService: CarritoServiciosService
  ) { }

  ngOnInit(): void {
    this.condicion = 4;
    this.get(this.orden);
    this.form = new FormGroup({
      cuantos: new FormControl(null, [Validators.required]),
    })
  }
   
  verificarSession(): boolean {
    return localStorage.getItem('token') != null;
  }


  agregar(item, metodo){
    //  Swal.fire('','Producto agregado al carrito','success');
     let session = this.verificarSession();
      
     if(session == true){
      var cantidad = 0;  
      let exist = this.productExisCard(item.id);
      if(metodo == 'default'){
       cantidad = 1; 
     }else{
        cantidad = this.form.controls.cuantos.value;
     }
      if(exist == false ){
           const obj = {
             cuanty: cantidad, 
          } 
          const newObj = Object.assign(item, obj);
          this.carritoService.addcarrito(newObj);
          let mensaje = 'Producto agregado al carrito';
          let titulo = 'Carrito';
          this.alertService.succes(mensaje,titulo); 
          console.log('NEW OBJETO', newObj);
  }else {
   let mensaje = 'Este producto ya se encuentra agregado a tu carrito';
   let titulo = 'Carrito';
   this.alertService.warnig(mensaje,titulo); 
  }

     }else{
      let mensaje = 'Para agregar un producto debe iniciar sessión';
      let titulo = 'Atención';
      this.alertService.warnig(mensaje,titulo);  
     }


 
}

productExisCard(id){
  const lista =  this.carritoService.getCartService();
  console.log('lista',lista);
  var exist: boolean;
   if(lista == null){
      exist = false;  
   }else{ 
    for(let item of lista){
      if(item.id == id ){
          console.log(item.id,'=', id);
         exist = true;
      }else{
           exist = false;
      } 
 }
   }
   return exist;
}

 

    get(orden) {
        this.serviciosService.getcategoria(this.condicion, orden).subscribe((data: any)=>{
          console.log(data);
            this.Sonidos = data.lista;
        },
          ((err: any)=>{
            console.log(err);
          })
        )
    }

    selectOrden(event) {
      // console.log(event);
      let orden = event.target.value;
      console.log(orden);
      this.get(orden);
      
    }
   video: string;
    verdetalles(servicio: Servicios){
      console.log(servicio);
      this.servicio.descripcion = servicio.descripcion;
      this.servicio.precio_venta = servicio.precio_venta;
      this.servicio.servicio    =  servicio.servicio;
      this.servicio.img = servicio.imagen;
      this.servicio = servicio;
      this.video = servicio.video;
      
    }






}
