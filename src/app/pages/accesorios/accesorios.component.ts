import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios/servicios.service';
import { Servicios } from 'src/app/model/servicios.interface';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import Swal from 'sweetalert2';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ProductosService } from '../../services/productos/productos.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';




@Component({
  selector: 'app-home',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {
  urlimg = 'https://servifiestas.com.mx/punto_venta/assets/images/services/';
 urlimgproducto = 'https://servifiestas.com.mx/punto_venta/assets/images/products/';
   
  accesorios:any [] = [];
  form!: FormGroup;
  p: number = 1;
  candicion: number;
  Servicios: Servicios [] = [];
  servicio: any = {};
  orden: string = 'No'; 

  constructor(
    private serviciosService: ServiciosService,
    private carritoproductoService: CarritoProductoService,
    private alertService: AlertsService,
    private productosService: ProductosService,
    private carritoService: CarritoServiciosService

  ) { }
  ngOnInit(): void {

    this.form = new FormGroup ({
      cuantos:  new FormControl(null, [Validators.required]),
   
  })
    this.candicion = 1;
    this.get(this.orden);
    this.getprodcutos();
  }

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


  selectOrden(event) {
    // console.log(event);
    let orden = event.target.value;
    console.log(orden);
    this.get(orden);
    
  }

   get(orden){
             
      this.serviciosService.getcategoria(this.candicion,orden).subscribe((data: any)=>{
       console.log('LISTA ACCESORIOS', data);
       this.Servicios = data.lista;
     },((err: any)=>{
       console.log(err);
     })
       
     )
   }





   
   detallesServicios(servicio: Servicios){
     console.log(servicio);
        this.servicio.descripcion = servicio.descripcion;
        this.servicio.precio_venta = servicio.precio_venta;
        this.servicio.servicio    =  servicio.servicio;
        this.servicio = servicio;
        this.servicio.img = servicio.imagen;
   }
  
   clear (){
       this.servicio = undefined;
       console.log(this.servicio);
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


verificarSession(): boolean {
    return localStorage.getItem('token') != null;
  }




  addservice(item, metodo){
    //  Swal.fire('','Producto agregado al carrito','success');
      
     let session =  this.verificarSession();

    
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
}else { 
  let mensaje = 'Para agregar un producto debe iniciar sessión';
  let titulo = 'Atención';
  this.alertService.warnig(mensaje,titulo); 
     }

  
  }

  service(id){
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

  producto: any = {};
  img: any;

  see(item){
    console.log('see obj', item);
   this.producto = item;
   this.producto.precio = item.precio_venta;
   this.producto.nombre = item.nombre;
   this.producto.imagen = item.imagen;
   this.producto.des    =  item.descripcion;
   this.img = item.imagen;
}



   agregar(item, metodo){
    // Swal.fire('','Producto agregado al carrito','success');
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

    }else {
      let mensaje = 'Para agregar un producto debe iniciar sessión';
      let titulo = 'Atención';
      this.alertService.warnig(mensaje,titulo);   
    
    }
 

    

}


}
