import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/extras/alerts/alerts.service';
import { CorreosService } from '../../services/correos/correos.service';
import { ExtrasService } from 'src/app/services/extras/extras/extras.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Servicios } from 'src/app/model/servicios.interface';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urlimg= 'https://servifiestas.com.mx/punto_venta/assets/images/products/'; 
  urlimgserv = 'https://servifiestas.com.mx/punto_venta/assets/images/services/';
  form!: FormGroup;
   
  flag: Boolean = false;
  formSerch: FormGroup;
  servicios: any [] = [];

  articulos:any = [
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
    { img: './assets/imgs/globo.png', precio: '50', precionew: '40' },
  ]

  categorias:any = [
    { img: './assets/imgs/acces.png', name: 'Accesorios', desc: 'Tenemos el mejor surtido en artículos para fiesta con precios de mayoreo. Contamos con productos de carnaval, butacada, temáticos, sombreros, neón, etc.', ruta:'/accesorios'  },
    { img: './assets/imgs/pinata.jpg', name: 'Piñatas personalizadas', desc: 'Echa un vistazo a nuestra selección de piñatas para ver las mejores piezas hechas a mano, es lo que le hace falta para tu fiesta para hacerla única.', ruta:'/piñatas'  },
    { img: './assets/imgs/inflable.jpg', name: 'Renta de inflables', desc: 'Somos tu mejor opción en Renta de inflables para niños renta de brincolines, renta de juegos infantiles y más. Solo nosotros te damos seguridad ¡Conócenos!', ruta:'/inflables'  },
    { img: './assets/imgs/sonido.png', name: 'Renta de sonido', desc: 'Renta de sonido e iluminación para todo tipo de eventos sociales, bodas, fiestas, xv años, etc. Bandas, mariachis y mucho más.', ruta:'/sonido'  },
    { img: './assets/imgs/fondo-salon.jpg', name: 'Salones', desc: '¡Conoce los salones que tenemos para hacer de tu event algo especial, lo que siempre soñaron!' , ruta:'/salones' },
    { img: './assets/imgs/boda.jpg', name: 'Arma tus paquetes', desc: 'Con nosotros puedes tener todo en tan solo unos clicks. ¡Desde los accesorios hasta el servicio de meseros!', ruta:'/personalizado'  },
   ]


   masvendido: any [] = [];

  constructor(
      private alertService: AlertsService,
      private correoService: CorreosService,
      private extraService: ExtrasService,
      private carritoproductoService: CarritoProductoService,
      private carritoService: CarritoServiciosService,
     public sanitizer: DomSanitizer,

      



  ) { }

  ngOnInit(): void {
    this.formSerch = new FormGroup({
       busqueda: new FormControl(null, [Validators.required]),
    })

    this.form =  new FormGroup ({
       correo: new FormControl(null,[Validators.required, Validators.email]),
       nombre: new FormControl(null),
       ciudad: new FormControl(null),
       estado: new FormControl(null),
       telefono: new FormControl(null),
       mensaje: new FormControl(null),
    })

    this.masvendidos();
  }

  enviaremial() {

     console.log(this.form.value);
    if(this.form.valid){
           this.correoService.correo(this.form.value).subscribe((data)=>{
             console.log(data);
             console.log('Comentario enviados');
             var mensaje = 'Gracias por tu mensaje, nos podremos en contacto contigo';
             var titulo = 'Correo';
             this.alertService.succes(mensaje , titulo);
           })
    }else{
          var mensaje = 'Formulario no valido o faltan campos';
          var titulo = 'Correo';
          this.alertService.warnig(mensaje , titulo);
    }
         
  } 

  masvendidos(){
     this.extraService.masvendido().subscribe((data: any )=>{
         this.masvendido = data.lista;
          console.log('mas vendidos', this.masvendido);
        
     },((err: any)=>{
       console.log(err);
     })
     )
  }
  filter(){
    let obj = this.masvendido;
    let array =   obj.filter(obj =>  obj.ventas >= 1 ); 
    // console.log('filtro', array);
     return array;
  }

 buscar(){
    // console.log(this.formSerch.value);
    if(this.formSerch.valid){
      const obj = {
        buscar: this.formSerch.controls.busqueda.value,
     }   
    console.log('PALABRA A BUSCAR',obj);
    this.extraService.buscar(obj).subscribe((data: any)=>{
       if(data.lista.length == 0  ){
         console.log('NO SE ENCONTRARO RESULTADOS DE LA BUSQUEDA');
          var mensaje =  'NO SE ENCONTRARON RESULTADOS DE LA BUSQUEDA';
          var titulo = 'Busqueda';
          this.alertService.warnig(mensaje, titulo);
       }else{
           console.log('RESULTADO ENCONTRADOS', data.lista);
           var mensaje =  'BUSQUEDA EXITOSA';
           var titulo = 'Busqueda';
           this.flag = true; 
           this.alertService.succes(mensaje, titulo); 
           this.servicios = data.lista;
       }
    },((err: any)=>{
         console.log(err);
         var mensaje = 'HA OCURRIDO UN ERROR INESPERADO';
         var titulo = 'ERROR';
         this.alertService.err(mensaje, titulo);
    })
    )

    }else{ 
      var mensaje = 'DEBES DE IBGRESAR UN SERIVICIO';
      var titulo = 'ATENCIÓN';
      this.alertService.warnig(mensaje, titulo);

    }
 }
 addCarrito(item, metodo) {
  // console.log(item);


 let session = this.verificarSession();

 if(session == true){
  var cantidad = 0; 
  let exist = this.productExisCard(item.id);
  console.log('existentes', exist);

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
   this.alertService.warnig(mensaje,titulo); 
 }
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


productExisCard(id: any){
  const lista =  this.carritoproductoService.getcarproductos();
  console.log('productExisCard lista',lista);
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
 
servicio: any = {};
video: string;
detallesServicios(servicio: Servicios){
  console.log(servicio);
     this.servicio.descripcion = servicio.descripcion;
     this.servicio.precio_venta = servicio.precio_venta;
     this.servicio.servicio    =  servicio.servicio;
     this.servicio = servicio;
     this.servicio.img = servicio.imagen;
     this.video = servicio.video;
}
verificarSession(): boolean {
  return localStorage.getItem('token') != null;
}
// agregar servicios

agregar(item, metodo){
  //  Swal.fire('','Producto agregado al carrito','success');
    let session = this.verificarSession();
    
    if(session == true){
      var cantidad = 0;  
      console.log(item);   
      let exist = this.existService(item.id);
   
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

existService(id){
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
