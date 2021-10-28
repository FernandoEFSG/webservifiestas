import { Component, OnInit } from '@angular/core';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  urlimg = 'https://servifiestas.com.mx/punto_venta/assets/images/services/';
  
  // servicios:any = [
  //   { img: './assets/imgs/salones/salon.jpg',nombre:'Salon Las palmas', precio: '1500', descripcion: 'Salon con grandes entradas de luz, con colores claros y estilo elegante' },
  //   { img: './assets/imgs/salones/salon1.jpg',nombre:'Salon La hacienda', precio: '1900',  descripcion: 'Salon con estilo antigüo, buena iluminacion, colores claros y elegante.' },
  //   { img: './assets/imgs/sonido/sonido.jpg',nombre:'Banda MS', precio: '1500', descripcion: 'Altavoz potente con doble bocina y bajos potentes' },
  //   { img: './assets/imgs/sonido/sonido2.jpg',nombre:'Mariachi Herrera', precio: '1900',  descripcion: 'Altavoz potente con doble bocina y bajos potentes' },
  //   { img: './assets/imgs/inflables/inflable.jpg',nombre:'Inflable obstaculos', precio: '1500', descripcion: 'Inflable resbaladilla con obstaculos' },
  //   { img: './assets/imgs/inflables/inflable2.jfif',nombre:'Inflable piscina', precio: '1900',  descripcion: 'Inflable resbaladilla con piscina' },
  //   { img: './assets/imgs/coctelería/barman.jpg',nombre:'Barman especializado', precio: '1500', descripcion: 'Salon con grandes entradas de luz, con colores claros y estilo elegante' },
  //   { img: './assets/imgs/coctelería/barman2.jpg',nombre:'Barman aguas locas', precio: '1900',  descripcion: 'Salon con estilo antigüo, buena iluminacion, colores claros y elegante.' },
    
  // ]

  servicios: any [] = [];
   
  subtotal: number;
  isdisable: boolean = true;
  fragmento: any;
  fragmento1: any;
  isdisablepago: boolean = true;  
  tokenStripe: any;
  preciopaqueteria: any;
  nombrepaqueteria: any;

  constructor(
    private carritoService: CarritoServiciosService,
    private alertService: AlertsService,
    private router: Router,

  ) { }

  ngOnInit(): void {
      this.get();
  }
  
  get(){
    const lista =  this.carritoService.getCartService();
    if(lista == null){
       var mensaje = 'No existen productos registrados';
       var titulo = 'Carrito';
       this.alertService.warnig(mensaje, titulo);  
    }else {
    this.servicios = lista;
    console.log('lista carrito', this.servicios);
    this.setTotal();  
    }
  }
  
  


 
  setTotal(){ 
    var subtotal = 0;
    var total = 0;
    // var subtotal =0;
    var preciomayorista = 0;
    var precio_unidad = 0;
for (let item of this.servicios) {
     if(item.cuanty >= 10 ) {
             console.log('precio mayorista');
             preciomayorista  = preciomayorista + (Number(item.cuanty)*Number(item.precio_mayorista));
             console.log('Precio mayorista', item.precio_mayorista);
             console.log('total mayorista', preciomayorista);

     }else{
      precio_unidad  = precio_unidad + Number(item.cuanty)*Number(item.precio_venta);  
     }
} 
//  console.log('precio final',  precio_unidad + preciomayorista );
var cantidad_pagar = 0;
cantidad_pagar = precio_unidad + preciomayorista ;
this.subtotal =  Math.round(cantidad_pagar);
console.log('Precio Final', this.subtotal);
}

delete(index: number){
  console.log(index);
  const lista = this.carritoService.deleteproducto(index);
  this.servicios = lista;
  this.setTotal();
  console.log('delete',this.servicios);
  if(this.servicios.length == 0){
  // this.router.navigate(['/home']);
    console.log('Eliminar todo');
    this.carritoService.vaciarcarrito();
     
  }
  console.log('lista carrito', this.servicios);
  var mensaje = 'Producto eliminado del carrito';
  var titulo = 'Carrito';
  this.alertService.succes(mensaje, titulo);  
}

inciarcompra(){
  // let cart = this.existproducto();
  if(this.subtotal > 20){
    this.router.navigate(['/apartar']);
       
      
  }else{
   var mensaje = 'La compra minima es de $20 pesos, para continuar con la compra agrega más productos al carrito';
   var titulo = 'Atención'; 
   // this.open();
   // this.alertService.warnig(mensaje, titulo);  
   this.open();
  }
}

open(){
  ($('#exampleModal') as any).modal('show');

}
comprarmas(){
    this.close();
    this.router.navigate(['/accesorios']);
}

 close(){
    ($('#exampleModal') as any).modal('hide');
    ($('body')as any ).removeClass('modal-open');
    ($('.modal-backdrop')as any ).remove();
  }







}
