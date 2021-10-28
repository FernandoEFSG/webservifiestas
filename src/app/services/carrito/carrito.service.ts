import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { URL_SERVICES } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { ExtrasService } from "src/app/services/extras/extras.service";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito = [];
  total:number = 0;
  total_productos:number = 0;
  valentina_prop:string = "";
  letra_precio_aplicado:string = "";
  letra_pecio_anterior: string = "web";
  constructor(private http: HttpClient) {
  }

  get_carrito(){
    if (localStorage.getItem("carrito")==null || localStorage.getItem("carrito")== undefined || localStorage.getItem("carrito")=="") {
      
    }else{
      this.carrito = JSON.parse(localStorage.getItem("carrito"));
      this.getTotal();
    }
    console.log("CARRITO: "+JSON.stringify(this.carrito));
    this.precio_aplicado();
  }

  getTotal(){
    this.valentina_prop = JSON.parse(localStorage.getItem("valentina_prop"));
    this.total_productos = 0;
    this.total = 0;
    //
    for(let i=0; i<this.carrito.length; i++){
      this.total_productos += this.carrito[i].cantidad;
    }
    this.precio_aplicado();

    for(let i=0; i< this.carrito.length; i++){
      if (this.letra_precio_aplicado == 'especial') {
        this.total+= Number(this.carrito[i].precio_venta_especial * this.carrito[i].cantidad);
      } else if (this.letra_precio_aplicado == 'mayoreo') {
        this.total+= Number(this.carrito[i].precio_venta_mayoreo * this.carrito[i].cantidad)
      } else {
        this.total+= Number(this.carrito[i].precio_venta_web * this.carrito[i].cantidad);
      }
      // if (this.valentina_prop==="bodega") {
      //   if (this.total_productos >= 6) {
      //     
      //   } else {
      //     ;
      //   }
      // } else {
      //   if (this.total_productos >= 6) {
      //     this.total+= Number(this.carrito[i].precio_venta_mayoreo * this.carrito[i].cantidad);
      //   } else {
      //     this.total+= Number(this.carrito[i].precio_venta_web * this.carrito[i].cantidad);
      //   } 
      // }
    }

    // if (this.total_productos >= 12) {
    //   this.total = 0;
    //   for(let i=0; i<this.carrito.length; i++){
    //     this.total+= Number(this.carrito[i].precio_venta_mayoreo * this.carrito[i].cantidad); 
    //   }
    // }else if (this.total_productos >= 6) {
    //   this.total = 0;
    //   for(let i=0; i<this.carrito.length; i++){
    //     this.total+= Number(this.carrito[i].precio_venta_menudeo*this.carrito[i].cantidad); 
    //   }
    // }
    
  }

  addCart(id,nombre,descripcion,img_product,talla,cantidad,precio,
          precio_venta_mayoreo
          ,precio_venta_menudeo
          ,precio_venta_especial
          ,precio_venta_clientes
          ,precio_venta_web
          ,color){
    let existe = false;
    for(const item of this.carrito) {
      if (id == item.id && color == item.color && item.talla == talla) {
        existe = true;
        item.cantidad += cantidad;
      }
    }
      if (!existe) {
        this.carrito.push({ 
          id: id,
          nombre: nombre,
          color: color,
          descripcion: descripcion,
          img_product: img_product,
          talla: talla,
          cantidad: cantidad,
          precio: precio,
    
          precio_venta_mayoreo: precio_venta_mayoreo,
          precio_venta_menudeo: precio_venta_menudeo,
          precio_venta_especial: precio_venta_especial,
          precio_venta_clientes: precio_venta_clientes,
          precio_venta_web: precio_venta_web
        });
      }
    
    // this.extras.showToastSuccess("Agregado a tu carrito","["+cantidad+"] "+nombre);
    console.log(JSON.stringify(this.carrito));
    localStorage.setItem('carrito',JSON.stringify(this.carrito));
    this.getTotal();
    this.precio_aplicado();
  }
  descountCart(id, color, talla) {
    for(const item of this.carrito) {
      if (id == item.id && color == item.color && item.talla == talla) {
        if (item.cantidad > 1){
          item.cantidad -= 1;
        }
      }
    }
    localStorage.setItem('carrito',JSON.stringify(this.carrito));
    this.getTotal();
    this.precio_aplicado();
  }
  removeItem(index){
    this.total = 0;
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito',JSON.stringify(this.carrito));
    this.getTotal();
    this.precio_aplicado();
  }
  limpiarCarrito() {
    this.total = 0;
    this.carrito = [];
    localStorage.setItem('carrito',JSON.stringify(this.carrito));
    this.getTotal();
    this.precio_aplicado();
  }

  precio_aplicado() {
    let precioTemp = this.letra_precio_aplicado;
    
    if(this.total_productos < 6 && this.valentina_prop=='bodega') {
      this.letra_precio_aplicado = "mayoreo";
    }else if(this.total_productos < 6 && this.valentina_prop!='bodega'){
      this.letra_precio_aplicado= "web";
    }else if(this.total_productos >= 6 && this.valentina_prop=='bodega'){
      this.letra_precio_aplicado = "especial";
    }else if(this.total_productos >= 6 && this.valentina_prop!='bodega'){
      this.letra_precio_aplicado = "mayoreo";
    }
    if (precioTemp != this.letra_precio_aplicado) {
      this.letra_pecio_anterior = precioTemp;
    }
  }

}
