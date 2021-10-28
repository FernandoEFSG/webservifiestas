import { Component, OnInit } from '@angular/core';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit {
  preciopaqueteria: number = 0;
  nombrepaqueteria: string;
  subtotal: number;
  
  lista_shipment:any = [
    {proveedor:'Fedex',service:'estandar', precio:'280.00', duracion:'2 a 5 días hábiles', total:'2880.00'},
    {proveedor:'Estafeta',service:'estandar', precio:'220.00', duracion:'tiempo variado', total:'2820.00'},
    {proveedor:'Redpack',service:'express', precio:'200.00', duracion:'1 a 3 días hábiles', total:'2800.00'},
    {proveedor:'Flecha Amarilla',service:'estandar', precio:'250.00', duracion:'2 a 4 días hábiles', total:'2800.00'},

  ]
  listaprodutos: any [] = [];
  constructor(
    private productoServiceCart: CarritoProductoService,
    private alertService: AlertsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.get();
  
  }

    metodo_seleccionado(metodo: any, total: number, paqueteria: any) {
    console.log(paqueteria);
    this.preciopaqueteria = paqueteria.precio;
    this.nombrepaqueteria = paqueteria.proveedor;
    this.resumenpago();
    console.log( this.preciopaqueteria,  this.nombrepaqueteria);
   document
     .getElementById('metodo-' + metodo)
     ?.classList.add('bg-secondary', 'text-white');

   for (let index = 0; index < total; index++) {
     if (index == metodo) {
     } else {
       document
         .getElementById('metodo-' + index)
         ?.classList.remove('bg-secondary', 'text-white');
     }
   }
 } 

 get(){
  const lista =  this.productoServiceCart.getcarproductos();
  console.log(lista);
  if(lista == null){
     var mensaje = 'No existen productos registrados';
     var titulo = 'Carrito';
     this.alertService.warnig(mensaje, titulo);  
  }else {
  this.listaprodutos = lista;
  console.log('lista carrito', this.listaprodutos);
  this.setTotal();  
  }
  
}

setTotal(){ 
  var subtotal = 0;
  var total = 0;
  // var subtotal =0;
  var preciomayorista = 0;
  var precio_unidad = 0;
for (let item of this.listaprodutos ) {
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
this.total = this.subtotal;
console.log('Precio Final', this.subtotal);
}
total: number = 0;

 resumenpago(){
    this.subtotal;
    this.preciopaqueteria;
    this.nombrepaqueteria;
    this.total = 0;
    this.total = (Number(this.subtotal) + Number(this.preciopaqueteria));
    console.log(this.total);
 }

 guardardatos(){
  const obj = {
       preciopaqueteria: this.preciopaqueteria,
       totalpagar: this.total,
       nombrepaquete: this.nombrepaqueteria,
       subtotal: this.subtotal

  }
  console.log('Precio paqueteria', this.preciopaqueteria);
  if(this.preciopaqueteria == 0){
    let mensaje = 'Debes de seleccionar una paqueteria';
    let titulo = 'Atención';
    this.alertService.warnig(mensaje, titulo);
  }else{
      localStorage.setItem('dato_pago', JSON.stringify(obj));
      this.router.navigate(['/resumen-pago', 'productos']);
  }
}




}
