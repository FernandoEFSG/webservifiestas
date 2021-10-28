import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
 urlimg = 'https://servifiestas.com.mx/punto_venta/assets/images/products/';
productos: any [] = [];
form!: FormGroup;
producto: any = {};
listaCar: any = {};
img: any;
// [src]="urlImages+'productos-'+producto['id']+'/'+producto.img"
  constructor(
      private productosService: ProductosService,
      private alertService: AlertsService,
      private carritoproductoService: CarritoProductoService ,
  ) { }
  p: number = 1;

  ngOnInit(): void {
    this.get();
    this.form = new FormGroup({
      cuantos: new FormControl(null, [Validators.required]),
    })
  }

get(){
    this.productosService.get().subscribe((data: any)=>{
      console.log(data);
       this.productos = data.lista; 
       console.log('Productos',this.productos)
    },((err: any)=>{
      console.log(err);
    }))
  }

selectOrden(event){
     let orden = event.target.value;
     console.log('orden',orden);
      console.log(event);
    this.productosService.orden(orden).subscribe((data: any)=>{
      console.log('Data Productos', data);
      this.productos = data.lista;
      console.log(data);
    })
}


addCarrito(item, metodo) {
    // console.log(item);
    var cantidad = 0; 
     let exist = this.productExisCard(item.id);

     if(metodo == 'default'){
      cantidad = 1; 
    }else{
      cantidad = this.form.controls.cuantos.value;
    }
     if(exist == false ){
      if(item.cantidad > 1 ){
        if(item.cantidad >= cantidad){
          const obj = {
            cuanty: cantidad, 
         }
         const newObj = Object.assign(item, obj);

         this.carritoproductoService.setCarproductos(newObj);
         
         let mensaje = 'Producto agregado al carrito';
         let titulo = 'Carrito';
         this.alertService.succes(mensaje,titulo); 
         console.log('NEW OBJETO', newObj);
        } else {
          let mensaje = 'Ingresa una cantidad mmenor a' + ' ' +  cantidad ;
          let titulo = 'Carrito';
          this.alertService.warnig(mensaje,titulo);  
        }
    } else {
      let mensaje = 'Producto no disponible por el momento';
      let titulo = 'Carrito';
      this.alertService.succes(mensaje,titulo); 
    }
 }else {
  let mensaje = 'Este producto ya se encuentra agregado a tu carrito';
  let titulo = 'Carrito';
  this.alertService.warnig(mensaje,titulo); 
 }

}
see(item){
       console.log('see obj', item);
      this.producto = item;
      this.producto.precio = item.precio_venta;
      this.producto.nombre = item.nombre;
      this.producto.imagen = item.imagen;
      this.producto.des    =  item.descripcion;
      this.img = item.imagen;
}

productExisCard(id){
  const lista =  this.carritoproductoService.getcarproductos();
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


cantidad() {
       
}








}
