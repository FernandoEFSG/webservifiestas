import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Servicios } from 'src/app/model/servicios.interface';
import { ServiciosService } from 'src/app/services/servicios/servicios.service';
import { PinatasService } from '../../services/pinatas/pinatas.service';
import { URL_IMG } from 'src/environments/environment';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { AlertsService } from 'src/app/services/extras/alerts/alerts.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-trab_personalizado',
  templateUrl: './trab_personalizado.component.html',
  styleUrls: ['./trab_personalizado.component.css']
})
export class PersonalizadoComponent implements OnInit {
  urlImages: string = `${URL_IMG}pinatas/`;

  accesorios:any = [
   
  ]
  pinatas:any = [
  

  ]

  salones:any = [
  

  ]
  inflables:any = [
 

  ]
  cocteleria:any = [


  ]
  sonidos:any = [
   
  ]

  urlimg= 'https://servifiestas.com.mx/punto_venta/assets/images/products/'; 
  urlimgserv = 'https://servifiestas.com.mx/punto_venta/assets/images/services/';
  Cocteleria: any;
  constructor(
    private serviciosService: ServiciosService,
    private pinatasService: PinatasService,
    private carritoproductoService: CarritoProductoService,
    private alertService: AlertsService,
    private carritoService: CarritoServiciosService,
    private productosService: ProductosService,

  ) { }

  ngOnInit(): void {
    
    this.get();
    this.salon();
    this.coctelerias();
    this.sonido();
    this.inflable();
    this.piñata();
    this.getprodcutos();
  }
  agregar_p(){
    Swal.fire('','Producto agregado al carrito','success');
          }  

get(){
    var candicion = 1;
    this.serviciosService.getcategoria(candicion).subscribe((data: any)=>{
     console.log('acessorios', data);
     this.accesorios = data.lista;
   },((err: any)=>{
     console.log(err);
   })
     
   )
}

piñata(){
   var  condicion = 6;
  this.serviciosService.getcategoria(condicion).subscribe((data: any)=>{
    console.log('pinatas', data);
    this.pinatas = data.lista;
  },((err: any)=>{
    console.log(err);
  })
    
  )
}

agregar(item, metodo){
  //  Swal.fire('','Producto agregado al carrito','success');
    let session = this.verificarSession();
    
    if(session == true){
      var cantidad = 0;  
      console.log(item);   
      let exist = this.productExisCard(item.id);
   
      if(metodo == 'default'){
       cantidad = 1; 
     }else{
       // cantidad = this.form.controls.cuantos.value;
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





          


coctelerias(){
  var condicion = 5;
    this.serviciosService.getcategoria(condicion).subscribe((data: any)=>{
      console.log('cocoteleria', data);
      this.cocteleria= data.lista;
    },((err: any)=>{
      console.log(err);
    })
      
    )
  }
  
  sonido (){
    var condicion = 4;
    this.serviciosService.getcategoria(condicion).subscribe((data: any)=>{
      console.log('sonido', data);
      this.sonidos = data.lista;
    },((err: any)=>{
      console.log(err);
    })
      
    )
  }

salon (){
  var condicion = 2;
   this.serviciosService.getcategoria(condicion).subscribe((data: any)=>{
      console.log('salon', data);
      this.salones = data.lista;
    },((err: any)=>{
      console.log(err);
    })
    )
}

inflable(){
  var condicion = 3;
  this.serviciosService.getcategoria(condicion).subscribe((data: any)=>{
    console.log('inflable', data);
    this.inflables = data.lista;
  },((err: any)=>{
    console.log(err);
  })
  )
}






  agregar_s(){
    Swal.fire('','Servicio agregado al carrito','success');
          }

    

          
// productos
urlimgproducto = 'https://servifiestas.com.mx/punto_venta/assets/images/products/';
productos: any [] = [];
  getprodcutos(){ 
    this.productosService.get().subscribe((data: any)=>{
      console.log(data);
       this.productos = data.lista; 
       console.log('Productos',this.productos)
    },((err: any)=>{
      console.log(err);
    }))
  }
  verificarSession(): boolean {
    return localStorage.getItem('token') != null;
  }
  

  agregarp(item, metodo){
    // Swal.fire('','Producto agregado al carrito','success');
     let session = this.verificarSession();
    if(session == true){
      var cantidad = 0; 
      let exist = this.productExis(item.id);
  
      if(metodo == 'default'){
       cantidad = 1; 
     }else{
      //  cantidad = this.form.controls.cuantos.value;
     }
      if(exist == false ){
           const obj = {
             cuanty: cantidad, 
          }
          const newObj = Object.assign(item, obj);
          this.carritoproductoService.setCarproductos(newObj);
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

productExis(id){
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





}
