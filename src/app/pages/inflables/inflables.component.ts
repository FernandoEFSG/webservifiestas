import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiciosService } from 'src/app/services/servicios/servicios.service';
import { Servicios } from 'src/app/model/servicios.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './inflables.component.html',
  styleUrls: ['./inflables.component.css']
})
export class InflablesComponent implements OnInit {
  
  urlimg = 'https://servifiestas.com.mx/punto_venta/assets/images/services/';
  form!: FormGroup;
   
  inflables:any = [
    { img: './assets/imgs/inflables/inflable.jpg', precio: '1500', descripcion: 'Inflable resbaladilla con obstaculos' },
    { img: './assets/imgs/inflables/inflable2.jfif', precio: '1900',  descripcion: 'Inflable resbaladilla con piscina' },
    { img: './assets/imgs/inflables/inflable3.jfif', precio: '1435',  descripcion: 'Inflable castillo cuadrado con red' },
    { img: './assets/imgs/inflables/inflable4.jfif', precio: '1235',  descripcion: 'Inflable t-rex con resbaladilla' },

  ]
  p: number = 1;
  condicion: number;
  Inflables: Servicios [] = [];
  inflable: any = {};
  orden: string = 'No'; 

  constructor(
    private serviciosService: ServiciosService, 
    public sanitizer: DomSanitizer,
    private alertService: AlertsService,
    private carritoService: CarritoServiciosService

  ) { }

  ngOnInit(): void {
    this.condicion = 3;
    this.get(this.orden);
      this.form = new FormGroup({
      cuantos: new FormControl(null, [Validators.required]),
    })
  }


 

          selectOrden(event) {
            // console.log(event);
            let orden = event.target.value;
            console.log(orden);
            this.get(orden);
            
          }

          get(orden){
            this.serviciosService.getcategoria(this.condicion,orden ).subscribe((data: any)=>{
              console.log('LISTA INFLABLES', data);
              this.Inflables = data.lista;
            },((err: any)=>{
              console.log(err);
            })
            )
          }

img: any;
video: any;
detallesServicios(inflable: Servicios) {
  console.log(inflable);
  this.inflable.descripcion = inflable.descripcion;
  this.inflable.precio_venta =  inflable.precio_venta;
  this.inflable.servicio    =  inflable.servicio;
  this.inflable = inflable;
  this.img = inflable.imagen;
  this.video = inflable.video;
}

verificarSession(): boolean {
  return localStorage.getItem('token') != null;
}


agregar(item, metodo){
  //  Swal.fire('','Producto agregado al carrito','success');

   let session = this.verificarSession();
    console.log('Verificar session',   session);

   


   if(session === true){
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





}
